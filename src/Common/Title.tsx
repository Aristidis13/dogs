import { FunctionComponent } from "react";

interface TitleProps {
    name: string | JSX.IntrinsicElements | JSX.Element;
    titleClass?: string;
}
 
const Title: FunctionComponent<TitleProps> = (props: TitleProps) => {
    return ( <h1 className={props.titleClass || "pageTitle"}>{props.name}</h1> );
}
 
export default Title;