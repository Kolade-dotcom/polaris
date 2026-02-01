import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-card border border-border shadow-sm",
            headerTitle: "text-foreground",
            headerSubtitle: "text-muted-foreground",
            socialButtonsBlockButton:
              "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            formFieldLabel: "text-foreground",
            formFieldInput: "bg-background border-border text-foreground",
            formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
            footerActionLink: "text-coral hover:text-coral/90",
            dividerLine: "bg-border",
            dividerText: "text-muted-foreground",
            identityPreviewText: "text-foreground",
            identityPreviewEditButton: "text-coral hover:text-coral/90",
          },
        }}
      />
    </div>
  );
}
