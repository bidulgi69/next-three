import React from "react"

type LayoutProps = {
    children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <React.Fragment>
            {children}
            {
                /**
                 * @summary define styles that will be applied to every component globally.
                 */
            }
            <style jsx global>{`
                body {
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                    
                    width: 100%;
                    height: 100vh;
                    padding: 10pt 5pt 10pt 5pt;
                }
            `}
            </style>
        </React.Fragment>
    )
}

export default Layout