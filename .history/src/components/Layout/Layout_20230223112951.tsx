import Navigation from 'components/Navigation';

function Layout({ children }) {
    return (
        <div>
            <Navigation />
            <div className={styles.children}>
                {children}
            </div>
        </div>
    )
}

export default Layout;