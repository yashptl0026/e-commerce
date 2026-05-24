import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem, Order, UserProfile } from '../types';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  userProfile: UserProfile;
  addToCart: (product: Product, quantity: number, color: string, size: string) => void;
  removeFromCart: (productId: string, color: string, size: string) => void;
  updateCartQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  placeOrder: (shippingAddress: Order['shippingAddress']) => Order;
  updateProfile: (profile: Partial<UserProfile>) => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock Products Database using high quality Stitch image assets
const mockProducts: Product[] = [
  {
    id: 'obsidian-zenith-parka',
    name: 'Obsidian Zenith Parka',
    price: 2450.00,
    category: 'fashion',
    subCategory: 'Outerwear',
    description: 'Crafted from our signature "Liquid Carbon" technical silk, the Zenith Parka represents the pinnacle of urban utility and luxury. Featuring a modular insulation system and adaptive thermoregulation technology.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCakp8RuS6jMwiKf2OCX8GAuqFM-8_eDBB5whySz6s6Srh70DMBdjoUo3O_RJtLcIPbc3fnzn2c8UEhZsX2yJGiQV-Id31KBgPvsn_iwCxbpVH_GFcHUrR2gt4E01u1JSgfIQwzVcbpJSIFKoRhTJ8zhdttRzKFtzWc-YwJvLAEaeCl9KDtxUYG2UBHhFbfPBtKq6kv9O0s4M1mnyl_DrN2aM21IhQNcY12z1G-30Jlc7M6MM9EWeTAkGB0_v3eCZYTRxvWlplmZDg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBwmV0_rxCV6q4-XhmyM2yr5YkjmeOqmXUPx3WsIVDVwGiTEIBnE8C5_pYpS1wKzujC8ibOHeL__lrCrL6G2XiUZH7Nmf4K11MX53AHqAi73VlsCo6WVuuvlFmxBnP-kbPI-lXjZcaSBkw6rhuPqIXUAOZMwz-0kH13EUhXK1fvISEATB4qNwM-cR-kq-A5LBmviLcmjdN_BND0UQgaIUk1Cy_QNz7qTYfVx4SPX-d2np23xCuAtMTtwyFTPmD4aFYReyev-I59x5s',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDUspwBqOtEMFnj1pucKXK8MkAbrJdocLzIDdlANYwOnRpsHktk0xqzJ2F5FpoySoOf9DRvdp7DBTsuj74M-2rGPZcto2cLTodWtICVSrNqDvrwrCuTpUqt_zKRUc9N2SRjx9ZqT1aobPcGXEDdttvUyNedkRXMq3NMOcWkt6iWOEFWxf5mbY-GmlgPG63f8RzPNOmB1y74pmJoBVWabrmgXWCOBCzzXKpgSYOpiYzQRnLn6gpOzTdk6YStLymrKbk_5F569nRa9to'
    ],
    colors: [
      { name: 'Carbon Matte', hex: '#1A1A1A' },
      { name: 'Slate Grey', hex: '#334155' },
      { name: 'Titanium Frost', hex: '#E2E8F0' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    isNew: true,
    details: [
      'Waterproof "Liquid Carbon" technical silk shell',
      '800-fill power hypoallergenic goose down lining',
      'Removable storm hood with adjustable drawcords',
      'Laser-cut ventilation ports and chrome zip hardware',
      'Internal security pockets with RFID protection'
    ],
    sustainability: [
      '100% recycled nylon face fabric',
      'Responsibly Sourced Down (RDS) certified',
      'Produced in a carbon-neutral certified facility'
    ],
    shippingInfo: 'Complimentary shipping in signature Lumina Luxe packaging. Returns accepted within 30 days.'
  },
  {
    id: 'obsidian-smart-watch',
    name: 'Obsidian Smart Watch',
    price: 299.00,
    originalPrice: 375.00,
    category: 'accessories',
    subCategory: 'Watches',
    description: 'A sleek, matte black designer smart watch with glowing mechanical style display layout, floating in a dark, atmospheric tech-luxury aesthetic.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBno99WOBueYImcyeAmMN08wvq37AS2WBU0zsUftVC-qKNVS5bcD8gM2eGpJFKBEPJoO6iQGPg7kGbDPUaAfDz1LHSWhVSKVrUnswu3FFVRfurU-tDjMXbaG6RBsgPzldeFcGX7jqtaDWcGWodg7TyHju6kgHJ0XiOLpAcwNLRsVWuLSvPovkw2GXg83eXBmS5_KjaC7gpJvCnX218Io_SkngtNBeGsMxMW0PPni0r_xghP9LNU8_Kd77YWdAUqg3HOMsv1p9eaSuE'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#0F172A' },
      { name: 'Stealth Cyan', hex: '#06B6D4' }
    ],
    sizes: ['One Size'],
    rating: 4.7,
    isSale: true,
    details: [
      'Always-on custom holographic display',
      '7-day smart battery life in titanium casing',
      'Water resistant up to 50 meters (5 ATM)',
      'Advanced biometrics, sleep, and heart monitoring',
      'Stealth haptic notification system'
    ],
    sustainability: [
      'Recycled titanium grade-5 frame',
      'Conflict-free electronic components',
      'Eco-efficient solar assistance battery cell'
    ],
    shippingInfo: 'Ships within 24 hours. Includes wireless charging dock.'
  },
  {
    id: 'lunar-elite-sneakers',
    name: 'Lunar Elite Sneakers',
    price: 185.00,
    category: 'fashion',
    subCategory: 'Footwear',
    description: 'Ultralight performance sneakers featuring high-contrast futuristic lines and premium knit mesh engineered for elite comfort and visual distinction.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBNs8x75EYALHnv1U3hRE36ksR3Cxer862Uhys_vuxozoV8JGB7qoXKs99M8IbfSmtR7dDG2zUKWsraiTHGPMBUECM-YAHXNehT_z10GCX-5RFwPml22Z0lpU8dY8CzckHpzuSGplP4keJzaj8IVw1d7jpPaAWsWEz8B0JiUiARw7vCqMLepATHHBFgF9VbtM4QNVs8AWMj0vbmgwr8ILAZfBMroGygBitOHSEg2xpU9oudhu6gfNGfuK_O5bmbgyFwajkRsTXLSeA'
    ],
    colors: [
      { name: 'Lunar Grey', hex: '#94A3B8' },
      { name: 'Aurora Blue', hex: '#3B82F6' }
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    rating: 4.8,
    details: [
      'Advanced 3D-knit recycled mesh upper',
      'Responsive carbon fiber energy return plate',
      'Zero-gravity foam midsole cushion',
      'High-traction custom geometric tread pattern'
    ],
    sustainability: [
      'Upper knitted with 85% ocean-bound recycled plastic yarn',
      'Biodegradable natural rubber soles'
    ]
  },
  {
    id: 'minimalist-leather-tote',
    name: 'Minimalist Leather Tote',
    price: 450.00,
    category: 'accessories',
    subCategory: 'Bags',
    description: 'An elegant unstructured tote crafted in full-grain Italian calfskin. Designed to carry your premium essentials in style with architectural minimalism.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAyqPMvxKCXGSIX-sTit-qVmsgjTVoXPY82w5pTXspHRMhu_wlap66c49rD2L_CzxbyAckBHNoXlzn26qZSosnEmaBJZWBUcHJSKtrmYG3sOwDVXwC2QK7yCN1dNa2iN7F7umY3rKU3_zGTMGfSWNKhCVAfcW4I99lGS3DVJ1Xa-yvdWOw8ZHWUe-92VRkP86fZy_j64XQILUeHVY_lf6wXBXoVrXvreVeoygjWPi67DXL6VArWI30QYvAfEJv3b_S_MQWWqva8R-A'
    ],
    colors: [
      { name: 'Amber Tan', hex: '#B45309' },
      { name: 'Matte Black', hex: '#1C1917' }
    ],
    sizes: ['One Size'],
    rating: 4.6,
    details: [
      'Premium vegetable-tanned full-grain leather',
      'Hand-stitched seams and raw edges',
      'Interior zippered tablet and key pouch',
      'Sleek magnetic top button enclosure'
    ],
    sustainability: [
      'Tanned using natural organic plant extracts',
      '100% locally sourced premium leather by-product'
    ]
  },
  {
    id: 'aura-pro-audio',
    name: 'Aura Pro Audio Headphones',
    price: 320.00,
    category: 'electronics',
    subCategory: 'Audio',
    description: 'State of the art over-ear audio gear. Features industry-leading active noise cancellation (ANC) and custom acoustic drivers for breathtaking clarity.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDqrRl-nIXIzG4Og1QTUVjntU2zQWVcZxppUl53LDepHawBM_dY97fVJTbjcMbOrPsXIAElPgKT433tC68rbyoi_BD0jCNXOGovnUZCja_FHviGxgd3wfKEYd5h5y2wQKAZwPHEamTsWkOh_g6R5GHZdJWqvwnW69k6HDgefejh2Rh0OHBiQ_ZilIUnHGE2FRaBWxaSoYPqQmfTeEXDKSF2HxTxMKAyP1dAG-Zmq4nG32oPfikcuIrbTonuTgdlxBbvSYuwBvXXyMw'
    ],
    colors: [
      { name: 'Titanium Mist', hex: '#64748B' },
      { name: 'Midnight Blue', hex: '#1E3A8A' }
    ],
    sizes: ['One Size'],
    rating: 4.9,
    details: [
      '40mm custom beryllium-diated drivers',
      'Hybrid active noise cancelling technology',
      '30-hour battery life with fast charging (10m = 5h)',
      'Memory foam leather ear cups for pristine comfort'
    ],
    sustainability: [
      'Earcups made with 100% recycled aluminum structure',
      'Eco-packaging containing zero plastic elements'
    ]
  },
  {
    id: 'obsidian-peak-parka',
    name: 'Obsidian Peak Parka',
    price: 1250.00,
    category: 'fashion',
    subCategory: 'Outerwear',
    description: 'A masterpiece of technical outerwear. Highly protective structure combined with lightweight comfort and a striking high-end silhouette.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA6oEhZ242T0j2mX-ZMg_k_b7UqNE9S7YkwhjIhjBcZqXt10w5VrSZtDrlm1Kr9hxAjvoj1lzDKQj2fKGBhzaHZRc6dJTzw7I9O6EMy1U83GORlRNQ5mtO78vaj2DOdDIynIVg-zXuXVqqgRK7Gs3A8xw67vIBfxwbapvJobhSTnmEju6JGc9u5P5JlJ8-w0hxF2NxIaKhvOR4I4XtkBSRsprgdruO-fwZdNqb2yXQwFy668_1b0wU4V5hMsa3rh6DazHm4z1f3g9Y'
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#1E293B' },
      { name: 'Arctic Grey', hex: '#94A3B8' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    isNew: true,
    details: [
      '3-layer waterproof and windproof technical fabric',
      'Fully taped interior waterproof seams',
      'Multiple tactical utility pockets with waterguard zips',
      'Integrated wrist gaiters to seal in warmth'
    ],
    sustainability: [
      'Bluesign certified fabric dye processing',
      'PFC-free water repellent finish treatment'
    ]
  },
  {
    id: 'midnight-cashmere',
    name: 'Midnight Cashmere Sweater',
    price: 890.00,
    originalPrice: 1100.00,
    category: 'fashion',
    subCategory: 'Knitwear',
    description: 'An ultra-fine Italian knit cashmere crewneck. Draped beautifully on the body to showcase soft premium textures against standard digital interfaces.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAYhIYHwnmnHy11zEMrCuDnW5Y4Qu5nnw97tps4f4pR1MThqV0QLxWTrHWrlVAT6ENNZz82Y-Ga9P0EvNa0AugrQI7mFdQvxnGp0UAk0UDSNn6h5fF-3q6d77GCuLJA5yH9jcXqSeVQkXo3kmgtPdpRPny0vQzs8kVw6P0jlYWFW5Xt31avXRio313DrRSe3vlbdzxVZHTquAWbfgOW44GSQmSAUG49JhkyoMEW8yOu6rsEVl76hKw1cUnhqBkhu6Tp68yNU84Eeu8'
    ],
    colors: [
      { name: 'Midnight Navy', hex: '#1E3A8A' },
      { name: 'Heather Grey', hex: '#4B5563' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.9,
    isSale: true,
    details: [
      '100% pure long-staple Mongolian cashmere',
      '12-gauge knit structure with double-ply threads',
      'Ribbed cuffs, collar, and waist detailing',
      'Superior warmth-to-weight ratio'
    ],
    sustainability: [
      'Ethically harvested cashmere fibers (GOTS certified)',
      'Dyed with chemical-free natural color processing'
    ]
  },
  {
    id: 'linear-tailored-pant',
    name: 'Linear Tailored Pant',
    price: 650.00,
    category: 'fashion',
    subCategory: 'Tailoring',
    description: 'Sleek structural trousers featuring clean lines, premium creases, and a sharp navy drape that coordinates effortlessly with luxury blazers and knitwear.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA9YxHHdj8Mdq9830CacurImmjSEt4lxgSQlov5ji2vs1IGIFAMwCWAbHr7W-LgnN3AAykoWxsC9Rom2HF7rLzxFDTD1TKyvZsD-AQt7NziXJZ0Wsi6Wlb1mJkjiIv5-Ra33KnNenn2BaHs8hCYMHBIYErQMejx_fpPmbbV7XlirOFl1qBc_LYQ-T1KQviA30qtBx5kSrOM8mwbZoKetuPvScXZsvk7RSnd7gyhqHK0_feXJPwRFE1M3Shj73fHneL9Z3OQXRRZ9zs'
    ],
    colors: [
      { name: 'Navy Blue', hex: '#0F172A' },
      { name: 'Graphite Grey', hex: '#374151' }
    ],
    sizes: ['28', '30', '32', '34', '36'],
    rating: 4.5,
    details: [
      'Luxury virgin wool blend with touch of elastane stretch',
      'Sharp pressed front creases for tall profile',
      'Concealed zip fly and secure slide-lock waist closure',
      'Adjustable side tabs for custom tailored sizing'
    ],
    sustainability: [
      'Made from certified mulesing-free wool processing',
      'Handcrafted locally in small premium tailors'
    ]
  },
  {
    id: 'monolith-leather-belt',
    name: 'Monolith Leather Belt',
    price: 320.00,
    category: 'accessories',
    subCategory: 'Accessories',
    description: 'An architectural belt crafted in full-grain obsidian calfskin, finished with a sleek custom-brushed silver buckle.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPxcDvqijLvQmYsOPNrHEBsLfzgLuGu1HptTi4rYC7N4WZimk4XtAwOfNB53bOlAGgZEjdmQt5xHnS2noL9Nx42jNhLeuc5i5guQBTbE71i34wj8t-QKVLe0BvBQztJvWr1hZAfZs_9zcgXAmsl_Kq4tsedmoTdRvc6P00WZY8wtFA2t-U-e90zF8GeW-3DangSJp2p4d183Zp-9aSY-WLOvANuZSCmIgQJEffpwc0Oq5wPf3LkbACbxMz_GL8wDbjzL50qLO_TOA'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0F172A' }
    ],
    sizes: ['30', '32', '34', '36'],
    rating: 4.6,
    details: [
      '30mm width, crafted with double-bonded full-grain calfskin',
      'Brushed silver alloy minimal frame and buckle',
      'Subtle debossed signature logo on internal side'
    ],
    sustainability: [
      'Leather Working Group (LWG) certified gold tannery',
      'Non-toxic vegetable dye finish'
    ]
  },
  {
    id: 'lumina-silk-shirt',
    name: 'Lumina Silk Shirt',
    price: 480.00,
    category: 'fashion',
    subCategory: 'Tailoring',
    description: 'A fluid, technical silk dress shirt with a subtle sheen. Captures directional light beautifully and pairs seamlessly with modern tailoring.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB6B1D5we4PEKx2IWNqGVr8ugjdUhyQqwFjVbacBgw2Xsj7Jt8kwgd4a2-ajf9eXDGOx5YwE04WcL_i48ziPENBfjkzPRZj3euSZ2z8sFPg1sdboMuoybCijV2vk48DenIiSHUGHRTcNWUOj55jbk19YPQCqWsmwwicdAkconpSaqJSZaRDWqldUrHhYUZcRlzZaBmkigqwjeP3s5nueIKIyfy_EQzJHA6aSkfger2jsDG4sVPfV-joJrfF_-icj_-bMxbeqjQav2o'
    ],
    colors: [
      { name: 'Sapphire Midnight', hex: '#1E3A8A' },
      { name: 'Pearl White', hex: '#F8FAFC' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.7,
    isNew: true,
    details: [
      '100% natural Mulberry silk with technical satin finish',
      'Concealed premium button-down front placket',
      'Adjustable barrel cuffs with silver accent links',
      'Ergonomic shoulder seams for dynamic posture comfort'
    ],
    sustainability: [
      'OEKO-TEX Standard 100 certified non-toxic fibers',
      'Water-saving silk wash manufacturing processes'
    ]
  },
  {
    id: 'aero-lux-sneaker',
    name: 'Aero-Lux Sneaker',
    price: 720.00,
    category: 'fashion',
    subCategory: 'Footwear',
    description: 'High-performance designer high-tops, displaying reflective technical details on an obsidian and cyan platform.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAelnP0vweG8zSHTWyKZZc5ufl4FQHKJdlLfS-qlKtyiHO72I0TCLI85nL8iWTx4HHIn8I053PAqsNRV1LutVPebhqMZi74DMdsRE4KXTZ0kauCgxheDjilxiOgwBwJl8wi3j0cnMFI-vwTkuUHAiNu-rjD_ZTkFWiAOALxcCN9lGn_bqm3u_f0ntoF7e2JAvMLTZhrnhE7hPjkjkyqxdlagzaki3jb0rtDQBG8tGLbI6JzTxlJejgXanT6qd2sFAmVpzSrtmJmZSI'
    ],
    colors: [
      { name: 'Obsidian Cyan', hex: '#0F172A' }
    ],
    sizes: ['8', '9', '10', '11', '12'],
    rating: 4.8,
    details: [
      'Bonded technical mesh and Italian nubuck leather upper',
      'Impact-resistant carbon chassis sole unit',
      'Padded ankle collar with magnetic snap closure strap',
      'Iridescent safety reflective panels for night visibility'
    ],
    sustainability: [
      'Outsole contains 20% recycled bio-based materials',
      'Finished with solvent-free adhesive processing'
    ]
  },
  {
    id: 'stealth-cargo-trousers',
    name: 'Stealth Cargo Trousers',
    price: 890.00,
    category: 'fashion',
    subCategory: 'Tailoring',
    description: 'Refined technical wool cargo trousers with sleek lines, hidden zip utilities, and an outstanding modern fit.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAHlI9gnMBaH0RwDDSxbbSAu1-2M-G5WtfymwLEstYsjnNxt6rQuIZZhLantgLhQ0B3JvSxBFEUBN-NgrJgCbfjhBbWEXXTiACt2TDR6adVqhN80vEluoANgZwzeKeolvMWMV7Ab_QX9DWMs4yjVHG5TZarKq79_nLmYVbX6Usi8w3M9fUBrGcnO48VImj7NEyAV0fjgCRM6E1GJY-FNE9R0GGmuc_3NTiP-KzgM7wTNlaBVffIuZdNJyZPcTJ4sFDNUjBYT79Q49U'
    ],
    colors: [
      { name: 'Charcoal Grey', hex: '#4B5563' }
    ],
    sizes: ['30', '32', '34', '36'],
    rating: 4.6,
    details: [
      'Merino wool technical twill weave',
      'Hidden cargo utility pockets with magnetic flaps',
      'Waterproof zippers on rear pockets',
      'Articulated knees for unrestricted movement'
    ],
    sustainability: [
      'Made from certified organic wool processing',
      'Biodegradable thread elements'
    ]
  },
  {
    id: 'thermal-base-layer',
    name: 'Thermal Base Layer',
    price: 450.00,
    category: 'fashion',
    subCategory: 'Knitwear',
    description: 'A premium merino wool turtleneck featuring detailed textures and a luxury dark indigo palette for warmth and distinction.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLp9dY3uKRd71B_AzPPMvSzvQavbu1TS1Nym2MhT50AzcR7WBIyrDO5b3NbH143lodFkiik8tiwIE8-KpqschFDGdCurfnSivp59DXZHl2rTD0RTDAb-ltPPcH3eq1TTuC6StpRpm_vOGgE3P1p6hQjpye6Lhl9Lrh8j8KPG0g0PhW3Vz-KJbIBN27daObXvU7Iy4mikhXk3PEc9tbFmIR0TMxUplHH-yXByb3UbEy0fqiimuhtWcitT2beOnKAU-LYU6vFKxKRm0'
    ],
    colors: [
      { name: 'Midnight Indigo', hex: '#1E1B4B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    details: [
      '100% extra-fine Australian merino wool',
      'Rib-knit collar, cuffs, and hem detailing',
      'Exceptional thermal regulation and breathability',
      'Naturally odor-resistant and moisture-wicking'
    ],
    sustainability: [
      'Certified non-mulesed wool sourcing',
      'Biodegradable knit fibers'
    ]
  },
  {
    id: 'apex-terrain-boots',
    name: 'Apex Terrain Boots',
    price: 1200.00,
    category: 'fashion',
    subCategory: 'Footwear',
    description: 'Matte black luxury leather boots featuring a chunky sculptural sole, technical protection, and high-fashion aesthetics.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAngw6Yz3a8V_QyOv4dD-aiMNf9zxt48KS357y7z6a1UxlB0icgvTUUWdS-04znN7Ok66mN1pFkvX5xocBEwFazljA-_rSxVf6GEEIAvYEWhgjXXE1DQ3bHhlnmLYQOayFgo5hpnVhp95D-2rTib_AMobMh94Tj2NgFx2hUOmIol0jMEHzYvaHjHMcXaaqLRs4RSttAJX0vhMJnk2B7Q2BYxQn8qOMHMehZzmUBiZxCsyd7b8MT4MOu7cn5BhXPjCNl8Jx9eCKNFss'
    ],
    colors: [
      { name: 'Matte Black', hex: '#1E293B' }
    ],
    sizes: ['8', '9', '10', '11', '12'],
    rating: 4.7,
    details: [
      'Waterproof full-grain calfskin leather upper',
      'Sculptural Vibram® rubber lug sole for superior grip',
      'Speed-hook lacing system with technical cords',
      'Neoprene padded collar for ankle comfort and seal'
    ],
    sustainability: [
      'Eco-tanned premium leather by-product',
      'Recycled rubber content in outsole'
    ]
  },
  {
    id: 'flux-commuter-pack',
    name: 'Flux Commuter Pack',
    price: 680.00,
    category: 'accessories',
    subCategory: 'Bags',
    description: 'Sleek waterproof technical backpack with a minimalist silhouette, tailored with active organizational layout.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDrypFh-SKyelmxt8gWNZNE8AUUf7KoRlei6D8kpgtUMlJinp0vHD17FRPd-k9vXAS9OjnCcVoiPR5J8D7QRszvYLpA228ximqHOV1CJ0634G1n16pf7VYy7kY1gJfKfgGYQY3v4yD8xGFEIavaNg2EugpfunquODbfe-4zNwhlcH_zXwM9sbv-vqqgptNd2Jn1XzTFqTSeFV0M1oeMB6eBo13gPk-baUDEsVlDhVIidRzZA0TLagwOBxcgFaMgdoUytG3hWQNYz1s'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#111827' }
    ],
    sizes: ['One Size'],
    rating: 4.8,
    details: [
      'Waterproof polyurethane-coated technical fabric',
      'Padded sleeve for up to 16" laptop',
      'Magnetic buckle front closure system',
      'Ergonomic ventilated back panel and shoulder straps'
    ],
    sustainability: [
      'Outer fabric made with 100% recycled polyester',
      'PETA-approved vegan product materials'
    ]
  },
  {
    id: 'velvet-dusk-blazer',
    name: 'Velvet Dusk Blazer',
    price: 1200.00,
    category: 'fashion',
    subCategory: 'Tailoring',
    description: 'Luxury tailored velvet blazer in royal navy blue, highlighting fine details and bespoke construction.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBtTN-LrnvT4kN-fyJxga2cTAX8Dx1v0139Nf7LaCGG8OjrUp_gA-7EvZd0cyCW9WHDWgGqbhiDLYsDkHsYLZSzPGQ2-Ur-ujwzTWiYhs8_xnQWh7dlUqJiQKS0YwnlX_joAVb7P3MThfXHkJQL7ROE7gne0xFeJ6ppxF-4PccLgvKTwCwSbKhQknp3xhAJwrndGfUPy-Rng4OwEmt812KwW52sA9JAlNdImD85G-8LJ13P8yo6W26CYnMPHiqXPoMSV5S7CmRtPks'
    ],
    colors: [
      { name: 'Royal Navy', hex: '#1E40AF' }
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    rating: 4.9,
    details: [
      'Premium Italian cotton-velvet fabric with rich sheen',
      'Satin peak lapels and double-vented rear construction',
      'Slim structured fit with fully canvassed interior padding',
      'Genuine horn buttons and functional buttonholes'
    ],
    sustainability: [
      'Made from certified organic cotton yarns',
      'Bespoke production to minimize excess stock waste'
    ]
  },
  {
    id: 'lumina-luxury-serum',
    name: 'Lumina Luxury Serum',
    price: 185.00,
    category: 'decor',
    subCategory: 'Beauty',
    description: 'A collection of luxury skincare serums housed in frosted glass bottles. Pure premium extracts designed to hydrate and revitalize.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbUJZJg6kaMIZ39mfoEtSMi_cOTXU4kMEtHjiHIB_VCkGYpRGJdavEh2ihvTkoHYACkk7jAnQTJCjeHF-iMDULBrchFrerajWQipoYMGqBIudCmkkColBmDsAqhTjg9nvxXWNpVAFDohDiIm8qpVVKamlYpVzbiPonUd4fz1u0MTlt515Ke3onC0zsUr5U5j_jm_tRuLdZvEMxU0FkRtgyEctvts2ra4hsWxnn0Zal4h1zDjMd1Ip_YH2W5EcgfLhwsVF5EKXXcio'
    ],
    colors: [
      { name: 'Frost', hex: '#F1F5F9' }
    ],
    sizes: ['50 ml'],
    rating: 4.7,
    details: [
      'Formulated with organic marine algae and hyaluronic acid',
      'Hypoallergenic, fragrance-free skin solution',
      'Reduces fine lines and improves overall radiance'
    ],
    sustainability: [
      'Sourced through sustainable clean beauty practices',
      'Fully recyclable frosted glass packaging'
    ]
  },
  {
    id: 'shadow-chronograph',
    name: 'Shadow Chronograph Watch',
    price: 2400.00,
    category: 'accessories',
    subCategory: 'Watches',
    description: 'A minimalist stealth mechanical wristwatch with a sleek carbon dial and a matte black stainless steel band.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBaVin4vL3N81p2nwWolEyE5B3dID4aCUul9Y4_mfVt7zLRWXpnBzOf7WjzMDoeKWrVj0fM657rTDQZbHmfwOZm2L79fUOQhace737wHPUENab7I0iTrgrMfgt49Y2K4gDppElJKh_AaYIqynyc7zSrMYDFh72h-fOis-3euwczdcSuuDOMW5r9B06pR50jLc7Z8F5ex_uf8qPkQkGRGEF-ayg4ibnjTZdIs068RbCDx7vmrZyluN-_vyWG_iorUkjV0-hlC-tdhPU'
    ],
    colors: [
      { name: 'Shadow Black', hex: '#171717' }
    ],
    sizes: ['One Size'],
    rating: 4.9,
    details: [
      'Automatic self-winding Swiss mechanical movement',
      'Stealth black DLC coated stainless steel case',
      'Scratch-resistant sapphire crystal front glass',
      'Exposed exhibition caseback detailing'
    ],
    sustainability: [
      'Lifetime mechanics guarantee (lasts generations)',
      'Constructed with conflict-free source metals'
    ]
  },
  {
    id: 'essential-lab-tee',
    name: 'Essential Lab Tee',
    price: 120.00,
    category: 'fashion',
    subCategory: 'Knitwear',
    description: 'An organic cotton t-shirt with a subtle iridescent logo on the chest. Designed for premium comfort and daily understated luxury.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC1VMvm-xgt7l7Hx0KESCtl4oXdMq7ESimFjPmSVhnJ1Ina_MEvlfyYCshE-NpcoQ3sbQUkluuycFVJG-6mMgScNB1Zt31xAhJx6vjpaWuEHDALIVffBH0ea9PhhvN_IruHFW8DpyzSvC9wBBeFyHzengzRiX3Wsvp-gTPtZQDXvFTZzXyVyFkPwWJ0dW1VcAUiI83LHD80hOWsLGlGI5-jApuCHNWgRohs6MIkS4BURtz_OYmJAJnIYdsMzLLUgb2O94XV9Vg9FD0'
    ],
    colors: [
      { name: 'Stealth Grey', hex: '#374151' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.5,
    details: [
      '100% certified organic long-staple cotton',
      'Subtle iridescent brand logo heat-pressed on chest',
      'Reinforced crewneck collar to maintain shape over washes',
      'Relaxed modern drape'
    ],
    sustainability: [
      'Fair Trade Certified sewing facility production',
      'GOTS certified organic cotton agriculture fabric'
    ]
  }
];

const defaultProfile: UserProfile = {
  fullName: 'Alexander Mercer',
  email: 'alexander.mercer@luxemail.com',
  phone: '+1 (555) 839-2001',
  addresses: [
    {
      id: 'addr-default',
      fullName: 'Alexander Mercer',
      addressLine1: '742 Frost Obsidian Boulevard',
      addressLine2: 'Suite 404',
      city: 'Metropolis',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 (555) 839-2001',
      isDefault: true
    }
  ]
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lumina_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('lumina_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('lumina_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('lumina_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.fullName === 'Yash Patel') {
          return defaultProfile;
        }
        return parsed;
      } catch (e) {
        return defaultProfile;
      }
    }
    return defaultProfile;
  });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    localStorage.setItem('lumina_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lumina_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('lumina_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('lumina_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const addToCart = (product: Product, quantity: number, color: string, size: string) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        showToast(`Updated quantity of ${product.name} in your bag.`, 'success');
        return next;
      }

      showToast(`Added ${product.name} to your bag.`, 'success');
      return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
    });
  };

  const removeFromCart = (productId: string, color: string, size: string) => {
    setCart((prev) => {
      const filtered = prev.filter(
        (item) =>
          !(item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size)
      );
      showToast('Item removed from your bag.', 'info');
      return filtered;
    });
  };

  const updateCartQuantity = (productId: string, color: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedColor === color &&
        item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const prodName = mockProducts.find((p) => p.id === productId)?.name || 'Product';
      if (exists) {
        showToast(`Removed ${prodName} from your wishlist.`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Added ${prodName} to your wishlist.`, 'success');
        return [...prev, productId];
      }
    });
  };

  const placeOrder = (shippingAddress: Order['shippingAddress']) => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal > 1000 ? 0 : 25;
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const total = subtotal + shipping + tax;

    const newOrder: Order = {
      id: `ord-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      items: [...cart],
      subtotal,
      shipping,
      tax,
      total,
      status: 'processing',
      shippingAddress
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast('Your order has been placed successfully!', 'success');
    return newOrder;
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
    showToast('Profile details updated.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        products: mockProducts,
        cart,
        wishlist,
        orders,
        userProfile,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        placeOrder,
        updateProfile,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
