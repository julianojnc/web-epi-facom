import MenuBar from "../../MenuBar";

const PageContent = ({ children }) => {
    return (
        <section>
            <MenuBar />
            <div className="content-page">
                {children}
            </div>
        </section>
    );
}

export default PageContent;