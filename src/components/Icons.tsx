import {
  Home,
  User,
  FileText,
  ChevronDown,
  Menu,
  Globe,
  Pencil,
  Calendar,
  Check,
  Heart,
  Activity,
  Upload,
  Trash2,
  Edit2
} from 'lucide-react'

// Exporting modernized Lucide React icons with prop-forwarding support
export const HomeIcon = (props: any) => (
  <Home size={16} {...props} />
)

export const PersonIcon = (props: any) => (
  <User size={16} strokeWidth={1.8} {...props} />
)

export const FileIcon = (props: any) => (
  <FileText size={16} strokeWidth={1.8} {...props} />
)

export const ChevronDownIcon = (props: any) => (
  <ChevronDown size={14} strokeWidth={2} {...props} />
)

export const MenuIcon = (props: any) => (
  <Menu size={20} strokeWidth={2} {...props} />
)

export const GlobeIcon = (props: any) => (
  <Globe size={20} strokeWidth={2} {...props} />
)

export const PencilIcon = (props: any) => (
  <Pencil size={14} strokeWidth={2} {...props} />
)

export const CalendarIcon = (props: any) => (
  <Calendar size={14} strokeWidth={1.8} {...props} />
)

export const CheckIcon = (props: any) => (
  <Check size={12} strokeWidth={3} {...props} />
)

export const HeartIcon = (props: any) => (
  <Heart size={18} strokeWidth={2} color="#2563EB" {...props} />
)

export const PulseIcon = (props: any) => (
  <Activity size={18} strokeWidth={2} color="#00AC99" {...props} />
)

export const UploadIcon = (props: any) => (
  <Upload size={14} strokeWidth={2} {...props} />
)

export const TrashIcon = (props: any) => (
  <Trash2 size={14} strokeWidth={2} {...props} />
)

export const PencilEditIcon = (props: any) => (
  <Edit2 size={14} strokeWidth={2} {...props} />
)
