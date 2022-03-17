import { Component } from "react"
import { withRouter } from "react-router-dom"
import Carousel from "./Carousel"
import ErrorBoundary from "./ErrorBoundary"
import ThemeContext from "./ThemeContext"

class Details extends Component {
    constructor() {
        super()
        this.state = { loading: true }
    }

    async componentDidMount() {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
        )
        const json = await res.json()
        this.setState(
            Object.assign(
                {
                    loading: false,
                },
                json.pets[0]
            )
        )
    }
    render() {
        if (this.state.loading) {
            return <h2>loading...</h2>
        }
        const { animal, breed, city, state, description, name, images } = this.state
        return (
            <div className="details">
                <Carousel images={images} />
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} - ${breed} - ${city} - ${state}`}</h2>
                    <p>{description}</p>
                    <ThemeContext.Consumer >
                        {([theme]) => {
                            return (<button style={{ backgroundColor: theme }}>
                                {`Adopt ${name}`}
                            </button>)
                        }}
                    </ThemeContext.Consumer>
                </div>
            </div>
        )
    }
}

const DetailsWithRouter = withRouter(Details)

export default function DetailsErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <DetailsWithRouter {...props} />
        </ErrorBoundary>
    )
}