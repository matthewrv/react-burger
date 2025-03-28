import styles from "./ingridient-preview.module.css";

export type TIngridientPreviewProps = {
  image: string;
  name: string;
  extraClass?: string;
  overlimit?: number;
};

export default function IngridientPreview({
  image,
  name,
  extraClass,
  overlimit,
}: TIngridientPreviewProps) {
  if (overlimit) {
    return (
      <div className={`${styles.wrapper} ${extraClass}`}>
        <img className={`${styles.ingridientImage}`} src={image} alt={name} />
        <div className={`${styles.dim}`}></div>
        <span className={`${styles.counter} text text_type_main-default`}>
          +{overlimit}
        </span>
      </div>
    );
  }

  return (
    <img
      className={`${styles.ingridientImage} ${styles.wrapper} ${extraClass}`}
      src={image}
      alt={name}
    />
  );
}
