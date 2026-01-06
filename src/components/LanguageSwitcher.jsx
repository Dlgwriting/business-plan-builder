import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <Globe className="w-4 h-4 text-slate-500" />
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer"
            >
                <option value="en">English</option>
                <option value="zh">中文 (Mandarin)</option>
                <option value="ko">한국어 (Korean)</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;
