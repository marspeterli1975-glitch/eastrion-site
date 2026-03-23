type Props = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function SectionIntro({
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <section className="section-intro">
      <div className="section-intro-eyebrow">{eyebrow}</div>
      <h2 className="section-intro-title">{title}</h2>
      <p className="section-intro-description">{description}</p>
    </section>
  );
}
