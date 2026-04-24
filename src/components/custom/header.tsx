import Image from "next/image";
import { Container } from "@/components/custom/container";
import { LanguageSwitcher } from "@/components/custom/language-switcher";
import { Link } from "@/i18n/navigation";

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16">
      <Container className="flex h-full items-center justify-between">
        <Link href="/" aria-label="Home" className="flex items-center">
          <Image
            src="/img/icon-light.svg"
            alt="Kaiyn"
            width={32}
            height={32}
            priority
          />
        </Link>
        <LanguageSwitcher />
      </Container>
    </header>
  );
}
