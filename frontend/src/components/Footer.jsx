import { HeartIcon } from "@heroicons/react/24/solid";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm">🥭</span>
                            </div>
                            <span className="text-xl font-bold">MangoLeaf AI</span>
                        </div>
                        <p className="text-gray-400 mb-4 max-w-md">
                            Advanced AI-powered mango leaf disease classification system using
                            state-of-the-art deep learning for accurate, real-time diagnosis.
                        </p>
                        <div className="flex items-center text-sm text-gray-400">
                            <span>Made with</span>
                            <HeartIcon className="w-4 h-4 text-red-500 mx-1" />
                            <span>for sustainable agriculture</span>
                        </div>
                    </div>

                    {/* Technology */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Technology</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>Swin Transformer</li>
                            <li>LoRA Adaptation</li>
                            <li>FastAPI Backend</li>
                            <li>React Frontend</li>
                            <li>Tailwind CSS</li>
                        </ul>
                    </div>

                    {/* Performance */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Performance</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>99.3% Accuracy</li>
                            <li>8 Disease Classes</li>
                            <li>&lt;2s Processing</li>
                            <li>Real-time Results</li>
                            <li>Mobile Optimized</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} MangoLeaf AI. All rights reserved.
                    </p>
                    <p className="text-gray-400 text-sm mt-2 md:mt-0">
                        Research-grade AI for agricultural innovation
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;