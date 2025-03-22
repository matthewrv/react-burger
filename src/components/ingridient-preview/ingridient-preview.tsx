import ingridientPreviewStyles from "./ingridient-preview.module.css";

export type TIngridientPreviewProps = {
  image: string;
  name: string;
  extraClass?: string;
};

export default function IngridientPreview({
  image,
  name,
  extraClass,
}: TIngridientPreviewProps) {
  return (
    <img
      className={`${ingridientPreviewStyles.ingridientImage} ${extraClass}`}
      src={image}
      alt={name}
    />
  );
}
