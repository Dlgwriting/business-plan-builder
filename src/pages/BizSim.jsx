import React, { useEffect, useState } from 'react';
import { ArrowLeft, RefreshCw, Maximize2, Minimize2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const BizSim = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const iframeRef = React.useRef(null);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                setIsFullscreen(true);
            }).catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    // Listen for fullscreen change events (ESC key etc)
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const reloadGame = () => {
        if (iframeRef.current) {
            iframeRef.current.src = iframeRef.current.src;
        }
    };

    return (
        <div className="w-full h-screen flex flex-col bg-slate-900 overflow-hidden">
            {/* Header - Hidden in fullscreen usually, but let's keep it visible or minimal?
                If we go fullscreen on documentElement, this header is arguably visible unless we mask it.
                Actually, usually for games you want just the game area.
                Let's stick to window-mode for now with a toggle.
            */}
            {!isFullscreen && (
                <div className="bg-slate-800 p-3 shadow-md flex items-center justify-between z-10 shrink-0">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-700">
                            <ArrowLeft size={18} />
                            <span className="font-medium">Back</span>
                        </Link>
                        <h1 className="text-white font-bold text-lg tracking-wide hidden md:block">BizSim Tycoon</h1>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={reloadGame}
                            className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"
                            title="Reload Game"
                        >
                            <RefreshCw size={18} />
                        </button>
                        <button
                            onClick={toggleFullscreen}
                            className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"
                            title="Toggle Fullscreen"
                        >
                            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                        </button>
                    </div>
                </div>
            )}

            {/* Game Container */}
            <div className="flex-1 relative w-full h-full bg-black">
                <iframe
                    ref={iframeRef}
                    src="/bizsim/index.html"
                    className="w-full h-full border-none block"
                    title="BizSim Tycoon"
                    key="bizsim-iframe"
                />
            </div>
        </div>
    );
};

export default BizSim;
