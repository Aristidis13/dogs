import {FunctionComponent} from 'react'

interface DogProps {
    index:string,
    imgUrl: string
    key: string
}

const Dog: FunctionComponent<DogProps> = (props: DogProps) =>
    <div className={"dog-item-"+props.index}>
        <img src={props.imgUrl}
             className={"dog-image-"+props.index}
             alt="A cute dog"
        />
    </div>

export default Dog;