'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  Clock,
  FolderKanban,
  Users,
  UsersRound,
  FileText,
  DollarSign,
  Bell,
  Calendar,
  FileStack,
  Shield,
  BarChart3,
  Bot,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Calendar, label: 'Calendario', href: '/calendario' },
  { icon: Briefcase, label: 'Servizi', href: '/servizi' },
  { icon: Clock, label: 'Turni', href: '/turni' },
  { icon: FolderKanban, label: 'Commesse', href: '/commesse' },
  { icon: Users, label: 'Clienti', href: '/clienti' },
  { icon: UsersRound, label: 'Operatori / HR', href: '/operatori' },
  { icon: FileText, label: 'Timesheet', href: '/timesheet' },
  { icon: DollarSign, label: 'Amministrazione', href: '/amministrazione' },
  { icon: Bell, label: 'Alert Center', href: '/alert' },
  { icon: FileStack, label: 'Documenti', href: '/documenti' },
  { icon: Shield, label: 'Compliance', href: '/compliance' },
  { icon: BarChart3, label: 'Report', href: '/report' },
  { icon: Bot, label: 'AI Assistant', href: '/ai-assistant' },
  { icon: Settings, label: 'Impostazioni', href: '/impostazioni' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-sidebar border-r border-sidebar-border
          transition-transform duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <h1 className="text-2xl font-bold text-sidebar-foreground">
              NOESIS <span className="text-sidebar-primary">OS</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Centro Operativo Aziendale</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
                        ${
                          isActive
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                        }
                      `}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-sidebar-foreground mb-1">NOESIS v2.0</p>
              <p>© 2026 - PMI Gestionale</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
