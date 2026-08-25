import React, { useState } from 'react';
import { CATALOG_SHOP_ITEMS } from '@ludo/shared';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredItems = selectedCategory === 'ALL'
    ? CATALOG_SHOP_ITEMS
    : CATALOG_SHOP_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 max-w-6xl mx-auto">
      <header className="flex justify-between items-center py-6 border-b border-slate-800 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            LUDO LEGENDS SHOP
          </h1>
          <p className="text-slate-400 text-sm">Customize board themes, token skins, and 3D dice</p>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-yellow-400 font-bold text-sm">
            <span>🪙</span> 10,000 Coins
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-cyan-400 font-bold text-sm">
            <span>💎</span> 250 Gems
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {['ALL', 'BOARD_THEME', 'TOKEN_SKIN', 'DICE_SKIN'].map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.replace('_', ' ')}
          </Button>
        ))}
      </div>

      {/* Shop Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="flex flex-col justify-between p-6 space-y-4">
            <div>
              <div className="w-full h-36 bg-slate-800 rounded-xl mb-4 flex items-center justify-center text-4xl">
                🎨
              </div>
              <h3 className="text-lg font-bold font-heading">{item.name}</h3>
              <p className="text-slate-400 text-xs mt-1">{item.description}</p>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-800">
              <span className="font-bold text-yellow-400 text-sm">
                {item.price === 0 ? 'FREE' : `${item.price} ${item.currency}`}
              </span>
              <Button variant="primary" size="sm">
                Equip / Buy
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
