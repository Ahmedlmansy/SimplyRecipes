import Footer from "../compoants/Footer";
import Header from "../compoants/Header";

function NotFound() {
  return (
    <>
      <Header />
      <main className="page error-page">
        <section>
          <h1>404</h1>
          <h3>page not found</h3>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default NotFound;
