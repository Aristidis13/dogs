import {FunctionComponent} from 'react'

interface DogProps {
    index:string,
    imgUrl: string
    key: string
    alt?: string
    caption?: string
    prefix:string
}

const Dog: FunctionComponent<DogProps> = (props: DogProps) =>
    <figure className={props.prefix+'Figure-'+props.index}>
        {  <img src={props.imgUrl}
                className={props.prefix+'Img'+props.index}
                alt={ props.alt || "A cute dog"}
            />}
        { props.caption && <figcaption className={props.prefix+'Caption'+props.index}>{props.caption}</figcaption>}
    </figure>
export default Dog;