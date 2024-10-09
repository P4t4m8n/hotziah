export interface IMenuItem extends IMenuBtn {
  onClick?: () => void;
  link?: string;
}

export interface IMenuBtn {
  text?: string;
  iconSvg?: JSX.Element;
  imgUrl?: string;
  style: string;
}

export interface IMenu {
  menuBtn: IMenuBtn;
  items: IMenuItem[];
}
