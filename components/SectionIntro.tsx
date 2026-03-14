type Props = {
  kicker: string;
  title: string;
  text: string;
};

export default function SectionIntro({ kicker, title, text }: Props) {
  return (
    <div className="section-intro">
      <div>
        <div className="kicker">{kicker}</div>
        <h2>{title}</h2>
      </div>
      <p className="section-text">{text}</p>
    </div>
  );
}
