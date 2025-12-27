import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  CreditCard,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  // Close sidebar on route change (for mobile) - but only for actual navigation, not menu toggling
  useEffect(() => {
    // Only close on mobile when actually navigating to a new page
    if (isOpen && window.innerWidth < 768) {
      onClose();
    }
  }, [location.pathname, isOpen, onClose]);

  // Menu configuration with nested structure
  const menuItems = [
    { 
      path: '/', 
      icon: LayoutDashboard, 
      label: 'Dashboard' 
    },
    
    { 
      label: 'Category',
      icon: FolderTree,
      subItems: [
        {
          label: "Sub Category",
          subItems: [
            { path: '/categories/sub/add', label: "Add SubCategory" },
            { path: '/categories/sub/manage', label: "Manage SubCategory" }
          ]
        },
        {
          label: "Main Category",
          subItems: [
            { path: '/categories/main/add', label: "Add Main Category" },
            { path: '/categories/main/manageCategory', label: "Manage Main Category" }
          ]
        }
      ]
    },
    { 
      label: 'Products',
      icon: Package,
      subItems: [
        {
          label: "Men's Products",
          subItems: [
            { path: '/products/men/add', label: "Add Men's Products" },
            { path: '/products/men/manage', label: "Manage Men's Products" }
          ]
        },
        {
          label: "Women's Products",
          subItems: [
            { path: '/products/women/add', label: "Add Women's Products" },
            { path: '/products/women/manage', label: "Manage Women's Products" }
          ]
        }
      ]
    },
    { 
      label: 'Orders',
      icon: ShoppingCart,
      subItems: [
        { path: '/orders/Manage', label: "Order Mamage" },
      
      ]
    },
    { 
      label: 'Customer',
      icon: Users,
      subItems: [
        { path: '/users/manage', label: "Manage Customer" }
      ]
    },
    { 
      path: '/offers', 
      icon: CreditCard , 
      label: 'offers' 
    },

     { 
      path: '/feedback',
      label: 'feedback',
      icon: Users,
    },
    
    { 
      path: '/payments', 
      icon: CreditCard, 
      label: 'Payments' 
    },
    { 
      path: '/settings', 
      icon: Settings, 
      label: 'Settings' 
    },
  ];

  const isActive = (path) => {
    if (!path) return false;
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleMenu = (index) => {
    setOpenMenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Recursive component for rendering menu items
  const MenuItem = ({ item, index, level = 0 }) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isOpen = openMenus[index] || false;
    const active = isActive(item.path);
    
    // Auto-expand menu if any child is active (but don't override user's manual toggle)
    useEffect(() => {
      if (hasSubItems) {
        const shouldExpand = item.subItems.some(subItem => 
          subItem.path && isActive(subItem.path)
        );
        if (shouldExpand && !openMenus.hasOwnProperty(index)) {
          setOpenMenus(prev => ({
            ...prev,
            [index]: true
          }));
        }
      }
    }, [location.pathname]); // Only run when location changes

    if (hasSubItems) {
      return (
        <li>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleMenu(index);
            }}
            className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors text-white hover:bg-gold-800`}
          >
            <div className="flex items-center gap-3">
              {item.icon && <item.icon size={20} />}
              <span className="font-medium">{item.label}</span>
            </div>
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          
          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <ul className="mt-1 space-y-1">
              {item.subItems.map((subItem, subIndex) => (
                <MenuItem 
                  key={subIndex} 
                  item={subItem} 
                  index={`${index}-${subIndex}`} 
                  level={level + 1} 
                />
              ))}
            </ul>
          </div>
        </li>
      );
    } else {
      return (
        <li>
          <Link
            to={item.path || '#'}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-gold-700 text-black font-bold' : 'text-white hover:bg-gold-800'}`}
            style={{ 
              paddingLeft: level > 0 ? `${16 + (level * 16)}px` : '16px'
            }}
          >
            {item.icon && <item.icon size={20} />}
            <span className="font-medium">{item.label}</span>
          </Link>
        </li>
      );
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`w-72 bg-gradient-to-b from-gold-900 to-gold-800 h-screen fixed left-0 top-0 shadow-lg flex flex-col z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo and close button */}
        <div className="p-6 border-b border-gold-700 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Clothing Admin</h1>
          <button 
            onClick={onClose}
            className="md:hidden text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <MenuItem key={index} item={item} index={index} />
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gold-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-red-500 hover:text-white transition-colors w-full"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;