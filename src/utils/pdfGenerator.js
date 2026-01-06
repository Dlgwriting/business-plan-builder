import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePDF = (data, t) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // Helper to get translated text or fallback
    const getText = (key) => t ? t(key) : key;

    // Title & Brand
    const brandColor = data.brandColor || '#3B82F6';

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 59, g: 130, b: 246 }; // Default blue fallback
    }

    const { r, g, b } = hexToRgb(brandColor);

    doc.setFontSize(24);
    doc.setTextColor(r, g, b);
    doc.text(data.businessName || getText('planBuilder.fields.businessName'), pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(getText('planBuilder.common.completed'), pageWidth / 2, 30, { align: 'center' });

    let yPos = 45;

    const addSection = (title, content) => {
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(14);
        doc.setTextColor(r, g, b);
        doc.text(title, 20, yPos);
        yPos += 10;

        doc.setFontSize(12);
        doc.setTextColor(60, 60, 60);

        const splitText = doc.splitTextToSize(content || "Not specified", pageWidth - 40);
        doc.text(splitText, 20, yPos);

        yPos += (splitText.length * 7) + 10;
    };

    // 1. Business Overview
    addSection(`1. ${getText('planBuilder.steps.overview')}`, data.description);

    // 2. Elevator Pitch
    if (data.elevatorPitch) {
        addSection(`2. ${getText('planBuilder.steps.elevatorPitch')}`, data.elevatorPitch);
    }

    // 3. SWOT Analysis
    const swotContent = `${getText('planBuilder.fields.swotStrengths')}: ${data.swotStrengths}\n` +
        `${getText('planBuilder.fields.swotWeaknesses')}: ${data.swotWeaknesses}\n` +
        `${getText('planBuilder.fields.swotOpportunities')}: ${data.swotOpportunities}\n` +
        `${getText('planBuilder.fields.swotThreats')}: ${data.swotThreats}`;
    addSection(`3. ${getText('planBuilder.steps.swot')}`, swotContent);

    // 4. Market Research
    if (data.competitors && data.competitors.length > 0) {
        let competitorText = "";
        data.competitors.forEach((comp, index) => {
            if (comp.name) {
                competitorText += `${getText('planBuilder.marketResearch.competitor')} ${index + 1}: ${comp.name}\n`;
                competitorText += `${getText('planBuilder.marketResearch.product')}: ${comp.product} | ${getText('planBuilder.marketResearch.price')}: ${comp.price}\n`;
                competitorText += `${getText('planBuilder.marketResearch.strengths')}: ${comp.strengths}\n${getText('planBuilder.marketResearch.weaknesses')}: ${comp.weaknesses}\n\n`;
            }
        });
        if (competitorText) {
            addSection(`4. ${getText('planBuilder.steps.marketResearch')}`, competitorText);
        }
    }

    // 5. Marketing
    addSection(`5. ${getText('planBuilder.steps.marketing')}`, `${getText('planBuilder.fields.targetAudience')}\n${data.targetAudience}`);

    const strategyMap = {
        'social': getText('planBuilder.marketing.strategies.social.title'),
        'flyers': getText('planBuilder.marketing.strategies.flyers.title'),
        'word': getText('planBuilder.marketing.strategies.word.title'),
        'partners': getText('planBuilder.marketing.strategies.partners.title'),
        'events': getText('planBuilder.marketing.strategies.events.title')
    };

    let strategyText = "";
    if (data.marketingStrategies && data.marketingStrategies.length > 0) {
        strategyText = data.marketingStrategies.map(id => `- ${strategyMap[id] || id}`).join('\n');
    } else {
        strategyText = data.marketing || "No strategies selected.";
    }

    addSection(`6. ${getText('planBuilder.marketing.title')}`, `${getText('planBuilder.marketing.selected')}:\n${strategyText}`);

    // 7. Finance
    addSection(`7. ${getText('planBuilder.steps.finance')}`, ""); // Header only

    // Add table for costs
    const tableData = Array.isArray(data.startupCosts)
        ? data.startupCosts.map(item => [item.item, `RM ${parseFloat(item.cost || 0).toFixed(2)}`])
        : [];

    if (tableData.length > 0) {
        // Add total row
        const total = data.startupCosts.reduce((sum, item) => sum + (parseFloat(item.cost) || 0), 0);
        tableData.push(['TOTAL', `RM ${total.toFixed(2)}`]);

        autoTable(doc, {
            startY: yPos,
            head: [[getText('planBuilder.finance.item'), getText('planBuilder.finance.cost')]],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185] },
            footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' },
            margin: { left: 20 },
            tableWidth: pageWidth - 40,
        });
        yPos = doc.lastAutoTable.finalY + 10;
    }

    // Add other financial details
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);

    const totalCost = data.startupCosts.reduce((sum, item) => sum + (parseFloat(item.cost) || 0), 0);
    const budget = parseFloat(data.budget) || 0;
    const remaining = budget - totalCost;

    const financeText = `${getText('planBuilder.finance.budget')}: RM ${budget.toFixed(2)}\n${getText('planBuilder.finance.spent')}: RM ${totalCost.toFixed(2)}\n${getText('planBuilder.finance.remaining')}: RM ${remaining.toFixed(2)}\n\n${getText('planBuilder.fields.price')}: ${data.price}\n${getText('planBuilder.fields.profit')}: ${data.profit}`;
    const splitFinance = doc.splitTextToSize(financeText, pageWidth - 40);
    doc.text(splitFinance, 20, yPos);
    yPos += (splitFinance.length * 7) + 10;

    // 8. Our Team
    if (data.teamMembers && data.teamMembers.length > 0) {
        let teamText = "";
        data.teamMembers.forEach((member, index) => {
            if (member.name) {
                teamText += `${index + 1}. ${member.name} - ${member.role}\n`;
                teamText += `   ${getText('planBuilder.team.skills')}: ${member.skills}\n\n`;
            }
        });
        if (teamText) {
            addSection(`8. ${getText('planBuilder.steps.team')}`, teamText);
        }
    }

    // 9. Action Plan
    addSection(`9. ${getText('planBuilder.steps.action')}`, data.actionPlan);

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(`Page ${i} of ${pageCount} - Generated by TeenBiz Builder`, pageWidth / 2, doc.internal.pageSize.height - 10, { align: 'center' });
    }

    // Sanitize filename
    const sanitizeFilename = (name) => {
        return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    };

    const filename = data.businessName ? sanitizeFilename(data.businessName) : 'business-plan';
    doc.save(`${filename}.pdf`);
};
