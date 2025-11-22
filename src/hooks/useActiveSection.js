import { useEffect, useState } from "react";

export const SECTION_IDS = ["hero", "about", "skills", "projects", "contact"];

export default function useActiveSection() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // scegli l'entry con più area visibile
        let mostVisible = null;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (
            !mostVisible ||
            entry.intersectionRatio > mostVisible.intersectionRatio
          ) {
            mostVisible = entry;
          }
        }

        if (mostVisible) {
          const id = mostVisible.target.id;
          if (SECTION_IDS.includes(id)) {
            setActive(id);
          }
        }
      },
      {
        threshold: [0.3, 0.5, 0.7], // consideriamo la sezione quando è abbastanza in vista
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}
