export function withAuth(gssp) {
  return async (context) => {
    const { req, res } = context;
    const token = req.cookies.token;
    res.setHeader("Cache-Control", "no-store");

    if (!token) {
      // Redirect to login page
      return {
        redirect: {
          destination: "/",
        },
      };
    }

    const gsspData = await gssp(context); // Run `getServerSideProps` to get page-specific data

    // Pass page-specific props along with user data from `withAuth` to component
    return {
      props: gsspData.props,
    };
  };
}
