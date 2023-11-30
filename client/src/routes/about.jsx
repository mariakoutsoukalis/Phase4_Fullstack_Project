// This component will render in the root's outlet at `/about`.
export default function About() {
    return (
        <div>
        <div className="background-div"></div>
        <div className="mt-3">
            <p>
                Email me at <a href="mailto:work@snehalabhale.com" className="hover:underline">work@snehalabhale.com</a>.
            </p>
            <div className="mt-5 flex flex-col text-xs">
                <p>Discover real-life experiences. Seamlessly. Delightfully.</p>
            </div>
        </div>
        </div>
    )
}