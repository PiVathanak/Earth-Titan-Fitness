export type Role = 'member' | 'staff' | 'admin'

export interface RoleOption {
  key: Role
  label: string
  icon: string
}

export interface RolePreset {
  placeholder: string
  btnText: string
}

export interface LoginForm {
  email: string
  password: string
  gymId: string
  remember: boolean
}

export interface StatusMessage {
  visible: boolean
  text: string
  icon: string
}

