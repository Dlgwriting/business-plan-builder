import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, FileText, Star, Sparkles, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 max-w-2xl"
            >
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                    Turn Your Idea Into a <span className="text-blue-600">Real Business</span>
                </h1>
                <p className="text-xl text-slate-600 mb-8 font-medium">
                    {t('home.subtitle')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/ideas" className="group relative px-8 py-4 bg-white border-2 border-slate-200 rounded-2xl hover:border-blue-400 hover:shadow-lg transition-all flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-yellow-500 mr-3 group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-slate-700">{t('home.startIdea')}</span>
                    </Link>
                    <Link to="/build" className="group relative px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all flex items-center justify-center">
                        <span className="font-bold mr-2">{t('home.startPlan')}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { icon: Star, color: "text-orange-500", bg: "bg-orange-50", title: t('home.features.simple'), desc: t('home.features.simpleDesc') },
                    { icon: Sparkles, color: "text-purple-500", bg: "bg-purple-50", title: t('home.features.ideas'), desc: t('home.features.ideasDesc') },
                    { icon: Download, color: "text-green-500", bg: "bg-green-50", title: t('home.features.pdf'), desc: t('home.features.pdfDesc') }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-4`}>
                            <item.icon className={`w-6 h-6 ${item.color}`} />
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-slate-500 leading-relaxed">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Home;
