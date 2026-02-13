import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {

    // --- YE FUNCTION ADD KAREIN ---
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Isse scroll smooth hoga, jump nahi karega
        });
    };

    return (
        <footer className="bg-gradient-to-br from-green-900 via-emerald-900 to-black text-white pt-16 pb-8">
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

                    {/* Column 1 */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Sprout className="text-green-400" size={32} />
                            <span className="text-2xl font-bold tracking-tighter">MYCO<span className="text-green-400">STORE</span></span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Cultivating the finest organic mushrooms.
                        </p>
                    </div>

                    {/* Column 2: Quick Links (YAHA CHANGE KARNA HAI) */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-green-100">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">

                            {/* Home Link par onClick lagayein */}
                            <li>
                                <Link to="/" onClick={scrollToTop} className="hover:text-green-400 transition cursor-pointer">
                                    Home
                                </Link>
                            </li>

                            {/* Shop Link par bhi laga sakte hain */}
                            <li>
                                <Link to="/shop" onClick={scrollToTop} className="hover:text-green-400 transition cursor-pointer">
                                    Shop All Fungi
                                </Link>
                            </li>

                            <li>
                                <Link to="/cart" onClick={scrollToTop} className="hover:text-green-400 transition cursor-pointer">
                                    My Cart
                                </Link>
                            </li>

                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-green-100">Contact Us</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-center gap-3">
                                <MapPin size={18} className="text-green-500" />
                                <span>123 Forest Lane, Myco City</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-green-500" />
                                <span>hello@mycostore.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-green-100">Stay Sprouted</h3>
                        <p className="text-gray-400 text-sm mb-4">Subscribe for growing tips and special offers.</p>
                        <div className="flex flex-col gap-2">
                            <input type="email" placeholder="Email" className="bg-white/10 p-2 rounded text-white" />
                            <button className="bg-green-600 p-2 rounded font-bold">Subscribe</button>
                        </div>
                    </div>

                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    © 2024 MycoStore. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;