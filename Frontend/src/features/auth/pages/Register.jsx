import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f1eb] px-4 py-4 text-[#2d2824] antialiased md:px-8">
      {/* Decorative background blurs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[50vw] w-[50vw] rounded-full bg-orange-900/5 blur-[100px] mix-blend-multiply" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[60vw] w-[60vw] rounded-full bg-[#e8e2d9] opacity-50 blur-[120px] mix-blend-multiply" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-[85vh] w-full max-w-[1400px] flex-col gap-12 overflow-hidden rounded-[2.5rem] bg-[#fdfbf6] p-6 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] md:p-12 lg:min-h-[90vh] lg:flex-row lg:gap-24 lg:p-16">
        {/* Vertical guide lines */}
        <div className="pointer-events-none absolute top-12 right-12 bottom-12 left-12 z-0 hidden border-x border-[#e8e2d9]/80 lg:block">
          <div className="absolute top-0 -left-[3px] h-1.5 w-1.5 border border-[#e8e2d9] bg-[#fdfbf6]" />
          <div className="absolute bottom-0 -left-[3px] h-1.5 w-1.5 border border-[#e8e2d9] bg-[#fdfbf6]" />
          <div className="absolute top-0 -right-[3px] h-1.5 w-1.5 border border-[#e8e2d9] bg-[#fdfbf6]" />
          <div className="absolute right-0 bottom-0 h-1.5 w-1.5 translate-x-[3px] border border-[#e8e2d9] bg-[#fdfbf6]" />
        </div>

        {/* Left column */}
        <section className="relative z-10 flex min-h-[40vh] flex-1 flex-col justify-between lg:min-h-full">
          <div className="flex w-fit items-center gap-2 text-[#2d2824]">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#d8d1c7] text-[10px] font-medium">
              I
            </div>
            <span className="text-xs font-medium uppercase tracking-[0.25em]">
              Inkpot
            </span>
          </div>

          <div className="my-auto max-w-xl pt-16 pb-8">
            <h1 className="mb-8 flex flex-col gap-1 text-6xl leading-[1.05] font-light tracking-tighter md:text-7xl lg:text-8xl">
              <span>Chat.</span>
              <span className="text-[#a39c94]">Research.</span>
              <span className="text-orange-600">Act.</span>
            </h1>

            <p className="max-w-md pr-4 text-sm leading-relaxed text-[#6e6862] md:text-base">
              Access an intelligent workspace where users can talk to an AI
              agent, run independent research, and take action from one calm,
              powerful interface.
            </p>
          </div>

          <div className="mt-auto hidden items-end justify-between lg:flex">
            <div className="flex max-w-[280px] flex-col gap-3">
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#8f8880]">
                Active Instances
              </span>

              <div className="flex items-center">
                <div className="flex -space-x-3">
                  <div className="h-10 w-10 rounded-full border-[3px] border-[#fdfbf6] bg-[#d8d1c7] shadow-sm" />
                  <div className="h-10 w-10 rounded-full border-[3px] border-[#fdfbf6] bg-[#c4bbb0] shadow-sm" />
                  <div className="h-10 w-10 rounded-full border-[3px] border-[#fdfbf6] bg-[#b1a79c] shadow-sm" />
                </div>

                <div className="-ml-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#fdfbf6] bg-[#f0ece5] text-xs font-medium text-[#6e6862] shadow-sm">
                  +4
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-[#e8e2d9] via-transparent to-transparent p-[1px] shadow-sm">
              <div className="flex items-center gap-4 rounded-[calc(1rem-1px)] bg-[#faf6f0] p-2 pr-6">
                <div className="h-10 w-10 rounded-xl bg-[linear-gradient(135deg,#d8d1c7,#f0ece5)] shadow-sm" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#2d2824]">
                    System Nominal
                  </span>
                  <span className="text-xs text-[#8f8880]">
                    Lattice connectivity 99.9%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right column */}
        <section className="relative z-10 mx-auto flex w-full max-w-[480px] flex-col justify-center lg:w-[45%]">
          <div className="group relative w-full rounded-[2rem] bg-gradient-to-br from-[#e8e2d9] via-transparent to-[#e8e2d9] p-[1px] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-[#fdfbf6] p-8 md:p-12">
              <div className="pointer-events-none absolute top-[-20%] right-[-20%] h-[50%] w-[50%] rounded-full bg-orange-200/30 blur-3xl" />
              <div className="relative z-10">
                <RegisterForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Register;
