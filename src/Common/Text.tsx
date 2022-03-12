import { FunctionComponent } from "react";

interface TextProps {
    textClass: string;
    text: string | JSX.Element;
}
 
const Text: FunctionComponent<TextProps> = (props: TextProps) => <p className={props.textClass}>{props.text}</p>
 
export default Text;