declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.ico' {
  const content: string;
  export default content;
}

declare module '*.bmp' {
  const content: string;
  export default content;
}

declare module 'react-input-mask';

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_UPLOADTHING_URL: string;
  readonly VITE_GOOGLE_MAPS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
}

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  description: string;
}

interface DashboardCardProps {
  children: React.ReactNode;
  title: string;
}

type Permission = 
  | 'VIEW_USERS'
  | 'EDIT_USERS'
  | 'DELETE_USERS'
  | 'VIEW_PROPERTIES'
  | 'EDIT_PROPERTIES'
  | 'DELETE_PROPERTIES'
  | 'VIEW_INVENTORY'
  | 'EDIT_INVENTORY'
  | 'DELETE_INVENTORY'
  | 'VIEW_REPORTS'
  | 'EDIT_REPORTS'
  | 'DELETE_REPORTS';

type UserRole = 
  | 'RESIDENTIAL_CUSTOMER'
  | 'COMMERCIAL_CUSTOMER'
  | 'ADMINISTRATOR'
  | 'TECHNICIAN'
  | 'MANAGER'
  | 'SUPPORT'
  | 'VENDOR'
  | 'CONTRACTOR'
  | 'BILLING_ADMIN'
  | 'QUALITY_INSPECTOR';
