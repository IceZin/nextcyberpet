import {FoodMonitor} from './FoodMonitor'
import {TempMonitor} from './TempMonitor'
import Error from 'next/error'
import { LightMonitor } from './LightMonitor'
import { WeightMonitor } from './WeightMonitor'

type StaticProps = {
    boxes: Object,
    pageInfo: Object
}

type FoodFetch = {
    feedTimes: Object
    feedOptions: Object
}

type TempFetch = {
    temperatureInfo: Object
}

type LightFetch = {
    lightInfo: Object
}

type WeightFetch = {
}

export default function Monitor(props) {
    if (props.path == "food") {
        return (
            <FoodMonitor {...props} />
        )
    } else if (props.path == "light") {
        return (
            <LightMonitor {...props} />
        )
    } else if (props.path == "temperature") {
        return (
            <TempMonitor {...props} />
        )
    } else if (props.path == "weight") {
        return (
            <WeightMonitor {...props} />
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

    console.log(slug);

    if (slug == "food") {
        let data = await fetch('http://localhost:1108/api/feed_info');
        const jsondata: FoodFetch = await data.json();

        return {
            props: {
                path: "food",
                boxes: jsondata?.feedTimes,
                pageInfo: jsondata?.feedOptions
            }
        }
    } else if (slug == "light") {
        let data = await fetch('http://localhost:1108/api/light_info');
        const jsondata: LightFetch = await data.json();

        return {
            props: {
                path: "light",
                pageInfo: jsondata?.lightInfo
            }
        }
    } else if (slug == "temperature") {
        let data = await fetch('http://localhost:1108/api/temp_info');
        const jsondata: TempFetch = await data.json();

        return {
            props: {
                path: "temperature",
                pageInfo: jsondata?.temperatureInfo
            }
        }
    } else if (slug == "weight") {
        let data = await fetch('http://localhost:1108/api/weight_info');
        const jsondata: WeightFetch = await data.json();

        return {
            props: {
                path: "weight"
            }
        }
    }

    return {
        props: {}
    }
}