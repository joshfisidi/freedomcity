# Route Surface
```
src/app/(dashboard)/app/page.tsx
src/app/(dashboard)/board/page.tsx
src/app/(dashboard)/layout.tsx
src/app/(dashboard)/programs/page.tsx
src/app/(dashboard)/settings/page.tsx
src/app/(dashboard)/team/page.tsx
src/app/auth/signout/route.ts
src/app/globals.css
src/app/layout.tsx
src/app/login/actions.ts
src/app/login/page.tsx
src/app/page.tsx
```

```
src/app/login/page.tsx:12:export default async function LoginPage({ searchParams }: LoginPageProps) {
src/app/login/actions.ts:13:export async function signIn(_: LoginState, formData: FormData): Promise<LoginState> {
src/app/layout.tsx:10:export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
src/app/(dashboard)/layout.tsx:7:export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
src/app/page.tsx:20:export default async function HomePage({ searchParams }: HomePageProps) {
src/app/(dashboard)/board/page.tsx:9:export default function BoardPage() {
src/app/auth/signout/route.ts:5:export async function POST(request: Request) {
src/app/(dashboard)/settings/page.tsx:8:export default function SettingsPage() {
src/app/(dashboard)/app/page.tsx:10:export default function DashboardPage() {
src/app/(dashboard)/team/page.tsx:6:export default function TeamPage() {
src/app/(dashboard)/programs/page.tsx:9:export default function ProgramsPage() {
```
