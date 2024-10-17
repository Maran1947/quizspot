import { ThemeProvider } from 'next-themes'
export function ThemeToggleProvider({ children }: { children: React.ReactNode }) {
    return <ThemeProvider attribute='class' defaultTheme='system' enableSystem>{children}</ThemeProvider>
}