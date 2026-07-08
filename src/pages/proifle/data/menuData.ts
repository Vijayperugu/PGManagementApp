import { User, Bell, Lock, Settings, FileText, LogOut } from 'lucide-react-native';

export interface MenuItem {
  id: string;
  icon: any;
  title: string;
  badge?: string;
  route?: string;
  onPress?: () => void;
  isDestructive?: boolean;
}

export const profileMenuItems: MenuItem[] = [
  {
    id: '1',
    icon: User,
    title: 'Profile',
    route: 'EditProfile',
  },
  {
    id: '2',
    icon: Bell,
    title: 'Notifications',
    badge: '3',
    route: 'Notifications',
  },
  {
    id: '3',
    icon: Lock,
    title: 'Password',
    route: 'ChangePassword',
  },
  {
    id: '4',
    icon: Settings,
    title: 'Settings',
    route: 'Settings',
  },
  {
    id: '6',
    icon: FileText,
    title: 'Privacy policy',
    route: 'PrivacyPolicy',
  },
];

export const logoutItem: MenuItem = {
  id: 'logout',
  icon: LogOut,
  title: 'Log out',
  isDestructive: true,
};
