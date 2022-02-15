import {FunctionComponent} from 'react'

interface DogProps {
    index:string,
    imgUrl: string
    key: string
}

const Dog: FunctionComponent<DogProps> = (props: DogProps) =>
    <li className={"dog-item-"+props.index}>
                <img src={props.imgUrl}
                     className={"dog-image-"+props.index}
                     alt="A cute dog" />
    </li>

export default Dog;