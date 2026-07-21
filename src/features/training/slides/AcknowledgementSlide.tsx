
import SignatureCanvas from "react-signature-canvas";
import { Card, Checkbox, Field, SlideHead } from "../components/primitives";
import { authService } from "@/services/sso/authService";

export function SlideAck(props: {
  ack: boolean;
  setAck: (b: boolean) => void;
  fullName: string;
  setFullName: (s: string) => void;
  empId: string;
  setEmpId: (s: string) => void;
  dept: string;
  setDept: (s: string) => void;
  sigMode: "draw" | "type";
  setSigMode: (m: "draw" | "type") => void;
  typedSig: string;
  setTypedSig: (s: string) => void;
  sigRef: React.RefObject<SignatureCanvas | null>;
  setSigData: (s: string) => void;
  sigData: string;
}) {
  const {
    ack,
    setAck,
    fullName,
    setFullName,
    empId,
    setEmpId,
    dept,
    setDept,
    sigMode,
    setSigMode,
    typedSig,
    setTypedSig,
    sigRef,
    setSigData,
  } = props;

  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const clearSig = () => {
    sigRef.current?.clear();
    setSigData("");
  };

  const captureSig = () => {
    const c = sigRef.current;
    if (!c || c.isEmpty()) {
      setSigData("");
      return;
    }
    setSigData(c.toDataURL("image/png"));
  };

  const ssoAccount = authService.getAccount();
  
  return (
    <div className="mx-auto max-w-4xl">
      <SlideHead
        kicker="Final step"
        title="Acknowledgement & signature"
        sub="Confirm your understanding and sign to complete the training."
      />

      <Card className="overflow-hidden">
        <div className="border-b border-border bg-primary-soft/50 p-5">
          <label className="flex cursor-pointer items-start gap-3">
            <div className="pt-0.5">
              <Checkbox checked={ack} onChange={setAck} />
            </div>
            <span className="text-sm font-medium leading-relaxed text-charcoal">
              I acknowledge that I have completed the PK5 Mining Confidentiality Training and
              understand my responsibility to protect confidential company information.
            </span>
          </label>
        </div>
         {/* acknowledgement FORM */}
        <div className="grid gap-5 p-6 md:grid-cols-2">
          {/* INPUT FEILDS */}
          <Field label="Full Name" value={ssoAccount?.name || fullName} onChange={setFullName} placeholder="Jane Doe" />
          <Field label="Employee ID" value={empId} onChange={setEmpId} placeholder="PK-4821" />
          <Field label="Department" value={dept} onChange={setDept} placeholder="Operations" />
          <div>
            <span className="mb-1.5 block text-sm font-semibold text-charcoal">Date</span>
            <div className="flex h-12 items-center gap-2 rounded-xl border border-border bg-muted px-3.5 text-sm text-charcoal">
              {today}
            </div>
          </div>
        </div>

        <div className="border-t border-border p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-charcoal">Signature</span>
            <div className="inline-flex rounded-lg bg-muted p-1">
              {(["draw", "type"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setSigMode(m)}
                  className={`rounded-md px-3 py-1 text-xs font-semibold capitalize transition-all ${
                    sigMode === m ? "bg-white text-charcoal shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {sigMode === "draw" ? (
            <div className="relative rounded-xl border border-dashed border-border bg-[oklch(0.99_0.005_82)]">
              <SignatureCanvas
                ref={sigRef}
                onEnd={captureSig}
                penColor="#1A1A1A"
                canvasProps={{ className: "h-40 w-full rounded-xl" }}
              />
              <button
                type="button"
                onClick={clearSig}
                className="absolute right-2 top-2 rounded-md bg-white px-2 py-1 text-xs font-medium text-muted-foreground shadow-sm hover:text-charcoal"
              >
                Clear
              </button>
              {!props.sigData && (
                <div className="pointer-events-none absolute inset-0 grid place-items-center text-xs text-muted-foreground/70">
                  Draw your signature here
                </div>
              )}
            </div>
          ) : (
            <input
              value={typedSig}
              onChange={(e) => setTypedSig(e.target.value)}
              placeholder="Type your full name"
              className="h-24 w-full rounded-xl border border-dashed border-border bg-[oklch(0.99_0.005_82)] px-4 text-center font-[cursive] text-3xl text-charcoal outline-none focus:border-gold"
              style={{ fontFamily: "'Brush Script MT', cursive" }}
            />
          )}
        </div>
      </Card>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        By signing, you agree that this record constitutes your legal acknowledgement.
      </p>
    </div>
  );
}
