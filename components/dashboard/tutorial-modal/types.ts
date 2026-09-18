export interface TutorialSlide {
  id: number;
  topImage: string;
  mainImage: string;
  title: string;
  subtitle: string;
}

export interface TutorialModalProps {
  open: boolean;
  onClose: () => void;
  slides: TutorialSlide[];
}
