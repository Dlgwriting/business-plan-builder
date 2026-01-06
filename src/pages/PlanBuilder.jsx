import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowRight, ArrowLeft, CheckCircle, Briefcase, Target, AlertTriangle, TrendingUp, Gamepad2, Utensils, Palette, Dumbbell, Music, Camera, Globe, Search, Check, Users } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';
import { useLanguage } from '../context/LanguageContext';

const PlanBuilder = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const initialIdea = searchParams.get('idea');
    const { t } = useLanguage();

    const steps = [
        {
            id: 'overview',
            title: t('planBuilder.steps.overview'),
            fields: [
                { name: 'businessName', label: t('planBuilder.fields.businessName'), placeholder: t('planBuilder.fields.businessNamePlaceholder'), type: 'text' },
                { name: 'description', label: t('planBuilder.fields.description'), placeholder: t('planBuilder.fields.descriptionPlaceholder'), type: 'textarea' }
            ],
        },
        {
            id: 'brand',
            title: t('planBuilder.steps.brand'),
            fields: [
                { name: 'brandColor', label: t('planBuilder.fields.brandColor'), type: 'color-picker' },
                { name: 'brandIcon', label: t('planBuilder.fields.brandIcon'), type: 'icon-picker' }
            ]
        },
        {
            id: 'swot',
            title: t('planBuilder.steps.swot'),
            fields: [
                { name: 'swotStrengths', label: t('planBuilder.fields.swotStrengths'), placeholder: t('planBuilder.fields.swotStrengthsPlaceholder'), type: 'textarea' },
                { name: 'swotWeaknesses', label: t('planBuilder.fields.swotWeaknesses'), placeholder: t('planBuilder.fields.swotWeaknessesPlaceholder'), type: 'textarea' },
                { name: 'swotOpportunities', label: t('planBuilder.fields.swotOpportunities'), placeholder: t('planBuilder.fields.swotOpportunitiesPlaceholder'), type: 'textarea' },
                { name: 'swotThreats', label: t('planBuilder.fields.swotThreats'), placeholder: t('planBuilder.fields.swotThreatsPlaceholder'), type: 'textarea' }
            ]
        },
        {
            id: 'marketResearch',
            title: t('planBuilder.steps.marketResearch'),
            fields: [] // Custom handling
        },
        {
            id: 'marketing',
            title: t('planBuilder.steps.marketing'),
            fields: [
                { name: 'targetAudience', label: t('planBuilder.fields.targetAudience'), placeholder: t('planBuilder.fields.targetAudiencePlaceholder'), type: 'textarea' },
                { name: 'marketing', label: t('planBuilder.fields.marketing'), placeholder: t('planBuilder.fields.marketingPlaceholder'), type: 'textarea' }
            ]
        },
        {
            id: 'finance',
            title: t('planBuilder.steps.finance'),
            fields: [
                // startupCosts removed from generic fields, handled separately
                { name: 'price', label: t('planBuilder.fields.price'), placeholder: t('planBuilder.fields.pricePlaceholder'), type: 'text' },
                { name: 'profit', label: t('planBuilder.fields.profit'), placeholder: t('planBuilder.fields.profitPlaceholder'), type: 'text' }
            ]
        },
        {
            id: 'team',
            title: t('planBuilder.steps.team'),
            fields: [] // Custom handling
        },
        {
            id: 'elevatorPitch',
            title: t('planBuilder.steps.elevatorPitch'),
            fields: [] // Custom handling
        },
        {
            id: 'action',
            title: t('planBuilder.steps.action'),
            fields: [
                { name: 'actionPlan', label: t('planBuilder.fields.actionPlan'), placeholder: t('planBuilder.fields.actionPlanPlaceholder'), type: 'textarea' }
            ]
        }
    ];

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        businessName: '',
        description: initialIdea ? `My idea is to start a ${initialIdea} business.` : '',
        targetAudience: '',
        marketing: '',
        startupCosts: [{ item: '', cost: '' }],
        price: '',
        profit: '',
        actionPlan: '',
        brandColor: '#3B82F6', // Default Blue
        brandIcon: 'briefcase',
        swotStrengths: '',
        swotWeaknesses: '',
        swotOpportunities: '',
        swotThreats: '',
        competitors: [
            { name: '', product: '', price: '', strengths: '', weaknesses: '' },
            { name: '', product: '', price: '', strengths: '', weaknesses: '' },
            { name: '', product: '', price: '', strengths: '', weaknesses: '' }
        ],
        budget: '500', // Default budget
        elevatorPitch: '',
        marketingStrategies: [],
        teamMembers: [{ name: '', role: '', skills: '' }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateStep = () => {
        const step = steps[currentStep];
        if (step.id === 'overview') {
            if (!formData.businessName.trim() || !formData.description.trim()) return false;
        }
        if (step.id === 'swot') {
            if (!formData.swotStrengths.trim() || !formData.swotWeaknesses.trim() || !formData.swotOpportunities.trim() || !formData.swotThreats.trim()) return false;
        }
        if (step.id === 'marketResearch') {
            // Check if at least one competitor is partially filled or enforce all?
            // User requested "filled in all the sections", so let's enforce all fields for all 3 competitors
            for (const comp of formData.competitors) {
                if (!comp.name.trim() || !comp.product.trim() || !comp.price.trim() || !comp.strengths.trim() || !comp.weaknesses.trim()) return false;
            }
        }
        if (step.id === 'marketing') {
            if (!formData.targetAudience.trim()) return false;
            if (formData.marketingStrategies.length !== 2) return false;
        }
        if (step.id === 'finance') {
            if (!formData.price.trim() || !formData.profit.trim()) return false;
            // Check startup costs - at least one item
            const validCosts = formData.startupCosts.filter(c => c.item.trim() && c.cost);
            if (validCosts.length === 0) return false;
        }
        if (step.id === 'team') {
            for (const member of formData.teamMembers) {
                if (!member.name.trim() || !member.role.trim() || !member.skills.trim()) return false;
            }
        }
        if (step.id === 'elevatorPitch') {
            if (!formData.elevatorPitch.trim()) return false;
        }
        if (step.id === 'action') {
            if (!formData.actionPlan.trim()) return false;
        }
        return true;
    };

    const handleNext = () => {
        if (!validateStep()) {
            alert("Please fill in all fields before proceeding!");
            return;
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            window.scrollTo(0, 0);
        } else {
            // Finished
            setCurrentStep(steps.length);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleDownload = () => {
        generatePDF(formData, t);
    };

    if (currentStep === steps.length) {
        return (
            <div className="max-w-2xl mx-auto text-center py-12">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-8 rounded-2xl shadow-lg border border-green-100"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('planBuilder.common.completed')}</h2>
                    <p className="text-slate-600 mb-8">
                        {t('planBuilder.common.congrats')} <span className="font-bold text-slate-900">{formData.businessName || "your business"}</span>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleDownload}
                            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
                        >
                            <Save className="w-5 h-5 mr-2" />
                            {t('planBuilder.common.download')}
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                        >
                            {t('planBuilder.common.home')}
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const stepData = steps[currentStep];

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
                    <span>Step {currentStep + 1} of {steps.length}</span>
                    <span>{Math.round(((currentStep) / steps.length) * 100)}% Completed</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-blue-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep) / steps.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            <motion.div
                key={currentStep}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
            >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">{stepData.title}</h2>

                <div className="space-y-6">
                    {stepData.id !== 'marketing' && stepData.fields.map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                {field.label}
                            </label>
                            {field.type === 'textarea' ? (
                                <textarea
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                />
                            )}
                        </div>
                    ))}

                    {/* Special handling for Marketing step */}
                    {stepData.id === 'marketing' && (
                        <div className="space-y-8">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    {t('planBuilder.fields.targetAudience')}
                                </label>
                                <textarea
                                    name="targetAudience"
                                    value={formData.targetAudience}
                                    onChange={handleChange}
                                    placeholder={t('planBuilder.fields.targetAudiencePlaceholder')}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-4">
                                    {t('planBuilder.marketing.title')}
                                </label>
                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { id: 'social', title: t('planBuilder.marketing.strategies.social.title'), icon: '📱', pros: t('planBuilder.marketing.strategies.social.pros'), cons: t('planBuilder.marketing.strategies.social.cons') },
                                        { id: 'flyers', title: t('planBuilder.marketing.strategies.flyers.title'), icon: '📄', pros: t('planBuilder.marketing.strategies.flyers.pros'), cons: t('planBuilder.marketing.strategies.flyers.cons') },
                                        { id: 'word', title: t('planBuilder.marketing.strategies.word.title'), icon: '🗣️', pros: t('planBuilder.marketing.strategies.word.pros'), cons: t('planBuilder.marketing.strategies.word.cons') },
                                        { id: 'partners', title: t('planBuilder.marketing.strategies.partners.title'), icon: '🤝', pros: t('planBuilder.marketing.strategies.partners.pros'), cons: t('planBuilder.marketing.strategies.partners.cons') },
                                        { id: 'events', title: t('planBuilder.marketing.strategies.events.title'), icon: '🎪', pros: t('planBuilder.marketing.strategies.events.pros'), cons: t('planBuilder.marketing.strategies.events.cons') },
                                    ].map((strategy) => {
                                        const isSelected = formData.marketingStrategies.includes(strategy.id);
                                        return (
                                            <div
                                                key={strategy.id}
                                                onClick={() => {
                                                    setFormData(prev => {
                                                        const current = prev.marketingStrategies;
                                                        if (current.includes(strategy.id)) {
                                                            return { ...prev, marketingStrategies: current.filter(id => id !== strategy.id) };
                                                        }
                                                        if (current.length < 2) {
                                                            return { ...prev, marketingStrategies: [...current, strategy.id] };
                                                        }
                                                        return prev;
                                                    });
                                                }}
                                                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-slate-200 hover:border-blue-300 bg-white'}`}
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-2xl">{strategy.icon}</span>
                                                        <h4 className={`font-bold ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>{strategy.title}</h4>
                                                    </div>
                                                    {isSelected && <CheckCircle className="w-6 h-6 text-blue-600" />}
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-xs">
                                                    <div>
                                                        <span className="font-bold text-green-600 block mb-1">👍 {t('planBuilder.fields.swotStrengths').split(' ')[0]}</span>
                                                        <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                                                            {strategy.pros.map((p, i) => <li key={i}>{p}</li>)}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold text-red-500 block mb-1">👎 {t('planBuilder.fields.swotWeaknesses').split(' ')[0]}</span>
                                                        <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                                                            {strategy.cons.map((c, i) => <li key={i}>{c}</li>)}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="text-right text-xs font-medium text-slate-500 mt-2">
                                    {t('planBuilder.marketing.selected')}: {formData.marketingStrategies.length}/2
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Special handling for Finance step (cost table) */}
                    {stepData.id === 'finance' && (
                        <div className="space-y-6">
                            {/* Budget Selector */}
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <label className="block text-sm font-bold text-blue-900 mb-2">
                                    💰 {t('planBuilder.finance.budgetQuestion')}
                                </label>
                                <div className="flex gap-4">
                                    {['500', '1000', '5000'].map((amt) => (
                                        <button
                                            key={amt}
                                            onClick={() => setFormData(prev => ({ ...prev, budget: amt }))}
                                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${formData.budget === amt
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                                                }`}
                                        >
                                            RM {amt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Budget Status */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
                                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{t('planBuilder.finance.budget')}</div>
                                    <div className="text-xl font-bold text-slate-900">RM {formData.budget}</div>
                                </div>
                                <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
                                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{t('planBuilder.finance.spent')}</div>
                                    <div className="text-xl font-bold text-orange-600">
                                        RM {formData.startupCosts.reduce((sum, row) => sum + (parseFloat(row.cost) || 0), 0).toFixed(2)}
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
                                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{t('planBuilder.finance.remaining')}</div>
                                    <div className={`text-xl font-bold ${(parseFloat(formData.budget) - formData.startupCosts.reduce((sum, row) => sum + (parseFloat(row.cost) || 0), 0)) < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                        RM {(parseFloat(formData.budget) - formData.startupCosts.reduce((sum, row) => sum + (parseFloat(row.cost) || 0), 0)).toFixed(2)}
                                    </div>
                                </div>
                            </div>

                            <label className="block text-sm font-semibold text-slate-700">
                                {t('planBuilder.finance.buyQuestion')}
                            </label>

                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="grid grid-cols-12 gap-4 mb-2 text-sm font-medium text-slate-500">
                                    <div className="col-span-7">{t('planBuilder.finance.item')}</div>
                                    <div className="col-span-4">{t('planBuilder.finance.cost')}</div>
                                    <div className="col-span-1"></div>
                                </div>
                                {formData.startupCosts.map((row, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-4 mb-2">
                                        <div className="col-span-7">
                                            <input
                                                type="text"
                                                placeholder="Item name"
                                                value={row.item}
                                                onChange={(e) => {
                                                    const newCosts = [...formData.startupCosts];
                                                    newCosts[index].item = e.target.value;
                                                    setFormData(prev => ({ ...prev, startupCosts: newCosts }));
                                                }}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                        <div className="col-span-4">
                                            <input
                                                type="number"
                                                placeholder="0.00"
                                                value={row.cost}
                                                onChange={(e) => {
                                                    const newCosts = [...formData.startupCosts];
                                                    newCosts[index].cost = e.target.value;
                                                    setFormData(prev => ({ ...prev, startupCosts: newCosts }));
                                                }}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                        <div className="col-span-1 flex items-center justify-center">
                                            {formData.startupCosts.length > 1 && (
                                                <button
                                                    onClick={() => {
                                                        const newCosts = formData.startupCosts.filter((_, i) => i !== index);
                                                        setFormData(prev => ({ ...prev, startupCosts: newCosts }));
                                                    }}
                                                    className="text-red-400 hover:text-red-600"
                                                >
                                                    &times;
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setFormData(prev => ({ ...prev, startupCosts: [...prev.startupCosts, { item: '', cost: '' }] }))}
                                    className="text-sm text-blue-600 font-medium hover:text-blue-700 mt-2"
                                >
                                    {t('planBuilder.finance.addItem')}
                                </button>

                                <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
                                    <span className="font-semibold text-slate-700">{t('planBuilder.finance.totalCost')}</span>
                                    <span className="text-xl font-bold text-blue-600">
                                        RM {formData.startupCosts.reduce((sum, row) => sum + (parseFloat(row.cost) || 0), 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                    🛍️ {t('planBuilder.finance.checkPrices')}
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <a href="https://www.ikea.com/my/en/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 bg-white rounded-lg text-sm font-medium text-blue-900 hover:bg-blue-100 transition-colors border border-blue-200">
                                        IKEA Malaysia
                                    </a>
                                    <a href="https://www.decathlon.my/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 bg-white rounded-lg text-sm font-medium text-blue-900 hover:bg-blue-100 transition-colors border border-blue-200">
                                        Decathlon
                                    </a>
                                    <a href="https://shopee.com.my/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 bg-white rounded-lg text-sm font-medium text-blue-900 hover:bg-blue-100 transition-colors border border-blue-200">
                                        Shopee
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Special handling for Brand step */}
                    {stepData.id === 'brand' && (
                        <div className="space-y-8">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-4">
                                    {t('planBuilder.fields.brandColor')}
                                </label>
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { color: '#3B82F6', name: 'Blue' },
                                        { color: '#EF4444', name: 'Red' },
                                        { color: '#10B981', name: 'Green' },
                                        { color: '#F59E0B', name: 'Orange' },
                                        { color: '#8B5CF6', name: 'Purple' },
                                        { color: '#EC4899', name: 'Pink' },
                                        { color: '#111827', name: 'Black' },
                                    ].map((c) => (
                                        <button
                                            key={c.color}
                                            onClick={() => setFormData(prev => ({ ...prev, brandColor: c.color }))}
                                            className={`w-12 h-12 rounded-full border-4 transition-all ${formData.brandColor === c.color ? 'border-slate-900 scale-110' : 'border-transparent hover:scale-105'}`}
                                            style={{ backgroundColor: c.color }}
                                            title={c.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-4">
                                    {t('planBuilder.fields.brandIcon')}
                                </label>
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                                    {[
                                        { id: 'briefcase', icon: Briefcase, label: 'Business' },
                                        { id: 'target', icon: Target, label: 'Goal' },
                                        { id: 'trending', icon: TrendingUp, label: 'Growth' },
                                        { id: 'check', icon: CheckCircle, label: 'Success' },
                                        { id: 'game', icon: Gamepad2, label: 'Gaming' },
                                        { id: 'food', icon: Utensils, label: 'Food' },
                                        { id: 'art', icon: Palette, label: 'Art' },
                                        { id: 'sport', icon: Dumbbell, label: 'Sports' },
                                        { id: 'music', icon: Music, label: 'Music' },
                                        { id: 'camera', icon: Camera, label: 'Photo' },
                                        { id: 'globe', icon: Globe, label: 'Online' },
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setFormData(prev => ({ ...prev, brandIcon: item.id }))}
                                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${formData.brandIcon === item.id ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 hover:border-blue-200 text-slate-500'}`}
                                        >
                                            <item.icon className="w-8 h-8 mb-2" />
                                            <span className="text-xs font-medium">{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Live Preview */}
                            <div className="mt-8 p-6 rounded-xl border border-slate-200 bg-white shadow-sm">
                                <h4 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Preview</h4>
                                <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-100" style={{ borderLeft: `4px solid ${formData.brandColor}` }}>
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: formData.brandColor }}>
                                        {(() => {
                                            const Icon = {
                                                briefcase: Briefcase, target: Target, trending: TrendingUp, check: CheckCircle,
                                                game: Gamepad2, food: Utensils, art: Palette, sport: Dumbbell, music: Music, camera: Camera, globe: Globe
                                            }[formData.brandIcon] || Briefcase;
                                            return <Icon className="w-6 h-6" />;
                                        })()}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900">{formData.businessName || "Your Business Name"}</h3>
                                        <p className="text-sm text-slate-500">Business Plan</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Special handling for SWOT step */}
                    {stepData.id === 'swot' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                <label className="block text-sm font-bold text-green-800 mb-2 flex items-center gap-2">
                                    💪 {t('planBuilder.fields.swotStrengths')}
                                </label>
                                <textarea
                                    name="swotStrengths"
                                    value={formData.swotStrengths}
                                    onChange={handleChange}
                                    placeholder={t('planBuilder.fields.swotStrengthsPlaceholder')}
                                    rows={3}
                                    className="w-full px-3 py-2 rounded-lg border border-green-200 focus:border-green-500 outline-none bg-white"
                                />
                            </div>
                            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                <label className="block text-sm font-bold text-red-800 mb-2 flex items-center gap-2">
                                    🛑 {t('planBuilder.fields.swotWeaknesses')}
                                </label>
                                <textarea
                                    name="swotWeaknesses"
                                    value={formData.swotWeaknesses}
                                    onChange={handleChange}
                                    placeholder={t('planBuilder.fields.swotWeaknessesPlaceholder')}
                                    rows={3}
                                    className="w-full px-3 py-2 rounded-lg border border-red-200 focus:border-red-500 outline-none bg-white"
                                />
                            </div>
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <label className="block text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
                                    🌟 {t('planBuilder.fields.swotOpportunities')}
                                </label>
                                <textarea
                                    name="swotOpportunities"
                                    value={formData.swotOpportunities}
                                    onChange={handleChange}
                                    placeholder={t('planBuilder.fields.swotOpportunitiesPlaceholder')}
                                    rows={3}
                                    className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none bg-white"
                                />
                            </div>
                            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                                <label className="block text-sm font-bold text-amber-800 mb-2 flex items-center gap-2">
                                    ⚠️ {t('planBuilder.fields.swotThreats')}
                                </label>
                                <textarea
                                    name="swotThreats"
                                    value={formData.swotThreats}
                                    onChange={handleChange}
                                    placeholder={t('planBuilder.fields.swotThreatsPlaceholder')}
                                    rows={3}
                                    className="w-full px-3 py-2 rounded-lg border border-amber-200 focus:border-amber-500 outline-none bg-white"
                                />
                            </div>
                        </div>
                    )}

                    {/* Special handling for Market Research step */}
                    {stepData.id === 'marketResearch' && (
                        <div className="space-y-6">
                            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-6">
                                <h3 className="font-bold text-indigo-900 mb-2">🕵️‍♂️ {t('planBuilder.marketResearch.title')}</h3>
                                <p className="text-indigo-700 text-sm mb-3">
                                    {t('planBuilder.marketResearch.desc')}
                                </p>
                                <a
                                    href="https://www.google.com/search?q=businesses+like+mine"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-white px-3 py-2 rounded-lg border border-indigo-200 shadow-sm transition-colors"
                                >
                                    <Search className="w-3 h-3 mr-2" />
                                    {t('planBuilder.marketResearch.searchButton')}
                                </a>
                            </div>

                            {formData.competitors.map((competitor, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                    <h4 className="font-bold text-slate-800 mb-4 flex items-center">
                                        <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs mr-2">{index + 1}</span>
                                        {t('planBuilder.marketResearch.competitor')} {index + 1}
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-500 mb-1">{t('planBuilder.marketResearch.name')}</label>
                                            <input
                                                type="text"
                                                value={competitor.name}
                                                onChange={(e) => {
                                                    const newCompetitors = [...formData.competitors];
                                                    newCompetitors[index].name = e.target.value;
                                                    setFormData(prev => ({ ...prev, competitors: newCompetitors }));
                                                }}
                                                placeholder={t('planBuilder.fields.businessNamePlaceholder')}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-500 mb-1">{t('planBuilder.marketResearch.product')}</label>
                                            <input
                                                type="text"
                                                value={competitor.product}
                                                onChange={(e) => {
                                                    const newCompetitors = [...formData.competitors];
                                                    newCompetitors[index].product = e.target.value;
                                                    setFormData(prev => ({ ...prev, competitors: newCompetitors }));
                                                }}
                                                placeholder="What do they sell?"
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-500 mb-1">{t('planBuilder.marketResearch.price')}</label>
                                            <input
                                                type="text"
                                                value={competitor.price}
                                                onChange={(e) => {
                                                    const newCompetitors = [...formData.competitors];
                                                    newCompetitors[index].price = e.target.value;
                                                    setFormData(prev => ({ ...prev, competitors: newCompetitors }));
                                                }}
                                                placeholder={t('planBuilder.fields.pricePlaceholder')}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-500 mb-1">{t('planBuilder.marketResearch.strengths')}</label>
                                            <input
                                                type="text"
                                                value={competitor.strengths}
                                                onChange={(e) => {
                                                    const newCompetitors = [...formData.competitors];
                                                    newCompetitors[index].strengths = e.target.value;
                                                    setFormData(prev => ({ ...prev, competitors: newCompetitors }));
                                                }}
                                                placeholder={t('planBuilder.fields.swotStrengthsPlaceholder')}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-semibold text-slate-500 mb-1">{t('planBuilder.marketResearch.weaknesses')}</label>
                                            <input
                                                type="text"
                                                value={competitor.weaknesses}
                                                onChange={(e) => {
                                                    const newCompetitors = [...formData.competitors];
                                                    newCompetitors[index].weaknesses = e.target.value;
                                                    setFormData(prev => ({ ...prev, competitors: newCompetitors }));
                                                }}
                                                placeholder={t('planBuilder.fields.swotWeaknessesPlaceholder')}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Special handling for Team step */}
                    {stepData.id === 'team' && (
                        <div className="space-y-6">
                            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 mb-6">
                                <h3 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                                    <Users className="w-5 h-5" /> {t('planBuilder.team.title')}
                                </h3>
                                <p className="text-orange-800 text-sm">
                                    {t('planBuilder.team.subtitle')}
                                </p>
                            </div>

                            {formData.teamMembers.map((member, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold text-slate-800 flex items-center">
                                            <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs mr-2">{index + 1}</span>
                                            {t('planBuilder.steps.team')} {index + 1}
                                        </h4>
                                        {formData.teamMembers.length > 1 && (
                                            <button
                                                onClick={() => {
                                                    const newTeam = formData.teamMembers.filter((_, i) => i !== index);
                                                    setFormData(prev => ({ ...prev, teamMembers: newTeam }));
                                                }}
                                                className="text-red-400 hover:text-red-600 text-sm font-medium"
                                            >
                                                {t('planBuilder.team.remove')}
                                            </button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-500 mb-1">{t('planBuilder.team.name')}</label>
                                            <input
                                                type="text"
                                                value={member.name}
                                                onChange={(e) => {
                                                    const newTeam = [...formData.teamMembers];
                                                    newTeam[index].name = e.target.value;
                                                    setFormData(prev => ({ ...prev, teamMembers: newTeam }));
                                                }}
                                                placeholder="Full Name"
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-500 mb-1">{t('planBuilder.team.role')}</label>
                                            <select
                                                value={member.role}
                                                onChange={(e) => {
                                                    const newTeam = [...formData.teamMembers];
                                                    newTeam[index].role = e.target.value;
                                                    setFormData(prev => ({ ...prev, teamMembers: newTeam }));
                                                }}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none bg-white"
                                            >
                                                <option value="">Select a Role...</option>
                                                <option value="CEO/Leader">{t('planBuilder.team.roles.ceo')}</option>
                                                <option value="Finance Manager">{t('planBuilder.team.roles.finance')}</option>
                                                <option value="Marketing Manager">{t('planBuilder.team.roles.marketing')}</option>
                                                <option value="Sales Representative">{t('planBuilder.team.roles.sales')}</option>
                                                <option value="Product Designer">{t('planBuilder.team.roles.product')}</option>
                                                <option value="Chef/Cook">{t('planBuilder.team.roles.chef')}</option>
                                                <option value="Developer">{t('planBuilder.team.roles.developer')}</option>
                                                <option value="Artist/Creative">{t('planBuilder.team.roles.artist')}</option>
                                                <option value="Customer Service">{t('planBuilder.team.roles.customer')}</option>
                                                <option value="Operations Manager">{t('planBuilder.team.roles.operations')}</option>
                                                <option value="Researcher">{t('planBuilder.team.roles.researcher')}</option>
                                                <option value="Content Creator">{t('planBuilder.team.roles.content')}</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-semibold text-slate-500 mb-1">{t('planBuilder.team.skills')}</label>
                                            <input
                                                type="text"
                                                value={member.skills}
                                                onChange={(e) => {
                                                    const newTeam = [...formData.teamMembers];
                                                    newTeam[index].skills = e.target.value;
                                                    setFormData(prev => ({ ...prev, teamMembers: newTeam }));
                                                }}
                                                placeholder="e.g., Good at math, drawing, cooking..."
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {formData.teamMembers.length < 5 && (
                                <button
                                    onClick={() => setFormData(prev => ({ ...prev, teamMembers: [...prev.teamMembers, { name: '', role: '', skills: '' }] }))}
                                    className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-bold hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                                >
                                    <Users className="w-5 h-5" /> {t('planBuilder.team.addMember')}
                                </button>
                            )}
                        </div>
                    )}

                    {/* Special handling for Elevator Pitch step */}
                    {stepData.id === 'elevatorPitch' && (
                        <div className="space-y-6">
                            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                                <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                                    🎤 {t('planBuilder.elevatorPitch.title')}
                                </h3>
                                <p className="text-purple-800 text-sm mb-4">
                                    {t('planBuilder.elevatorPitch.desc')}
                                </p>
                                <div className="bg-white p-4 rounded-lg border border-purple-100 text-sm text-slate-600 italic">
                                    {t('planBuilder.elevatorPitch.example')}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    {t('planBuilder.elevatorPitch.label')}
                                </label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {t('planBuilder.elevatorPitch.starters').map((starter) => (
                                        <button
                                            key={starter}
                                            onClick={() => setFormData(prev => ({ ...prev, elevatorPitch: prev.elevatorPitch + (prev.elevatorPitch ? ' ' : '') + starter }))}
                                            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs rounded-full transition-colors border border-slate-200"
                                        >
                                            + {starter}
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    name="elevatorPitch"
                                    value={formData.elevatorPitch}
                                    onChange={handleChange}
                                    placeholder="Start writing your pitch..."
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                                />
                            </div>
                        </div>
                    )}

                </div>

                <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className={`flex items-center text-slate-600 font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> {t('planBuilder.common.back')}
                    </button>
                    <button
                        onClick={handleNext}
                        className="flex items-center bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                    >
                        {currentStep === steps.length - 1 ? t('planBuilder.common.finish') : t('planBuilder.common.next')} <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default PlanBuilder;
