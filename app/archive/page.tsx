10:52:32.668 Running build in Washington, D.C., USA (East) – iad1
10:52:32.673 Build machine configuration: 2 cores, 8 GB
10:52:32.880 Cloning github.com/Vik725/personal-notes (Branch: main, Commit: 080e6cf)
10:52:33.957 Cloning completed: 1.077s
10:52:34.908 Restored build cache from previous deployment (CEsJ5TxLYR3gg5bNMojLLenUSymN)
10:52:35.189 Running "vercel build"
10:52:35.213 Vercel CLI 56.5.0
10:52:35.505 Installing dependencies...
10:52:41.490 
10:52:41.491 up to date in 6s
10:52:41.491 
10:52:41.491 235 packages are looking for funding
10:52:41.491   run `npm fund` for details
10:52:41.529 Detected Next.js version: 16.2.2
10:52:41.537 Running "npm run build"
10:52:41.639 
10:52:41.639 > vibecraft-template@0.1.0 build
10:52:41.639 > next build
10:52:41.639 
10:52:42.314   Applying modifyConfig from Vercel
10:52:42.333 ▲ Next.js 16.2.2 (Turbopack)
10:52:42.333 
10:52:42.362   Creating an optimized production build ...
10:52:48.096 ✓ Compiled successfully in 5.4s
10:52:48.097   Running TypeScript ...
10:52:52.025 Failed to type check.
10:52:52.025 
10:52:52.025 ./app/archive/page.tsx:67:20
10:52:52.025 Type error: Property 'active' does not exist on type '{ year: string; description: string; }'.
10:52:52.025 
10:52:52.025   65 |           {years.map((item, i) => (
10:52:52.026   66 |             <div key={i} className={`rounded-xl border bg-white p-5 shadow-sm ${
10:52:52.026 > 67 |               item.active ? "ring-2 ring-blue-500" : ""
10:52:52.026      |                    ^
10:52:52.026   68 |             }`}>
10:52:52.026   69 |               <div className="flex items-start gap-4">
10:52:52.026   70 |                 <div className={`flex h-12 w-12 shrink-0 items-center justify-center round...
10:52:52.092 Next.js build worker exited with code: 1 and signal: null
10:52:52.139 Error: Command "npm run build" exited with 1
