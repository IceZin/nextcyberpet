import {FoodMonitor} from './FoodMonitor'
import Error from 'next/error'

export default function Monitor(props) {

    if (props.path == "food") {
        return (
            <FoodMonitor {...props} />
        )
    } else {
        return (
            <Error statusCode={404}></Error>
        )
    }
}

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps = async (ctx) => {
    const {slug} = ctx.params;

    let data = await fetch('http://localhost:1108/api/feed_times');
    data = await data.json();

    console.log(data)

    console.log(slug);

    if (slug == "food") {
        return {
            props: {
                path: "food",
                boxes: data
            }
        }
    }

    return {
        props: {}
    }
}