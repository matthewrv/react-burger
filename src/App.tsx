import { useEffect } from "react";
import appStyles from "./App.module.css";
import AppHeader from "./components/app-header/app-header";
import { fetchIngredients } from "./services/ingredients";
import { useAppDispatch, useAppSelector } from "./services/hooks";
import Loader from "./components/loader/loader";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { HomePage } from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ForgotPasswordPage from "./pages/forgot-password";
import ResetPasswordPage from "./pages/reset-password";
import ProfilePage from "./pages/profile/profile";
import ErrorView from "./components/error/error";
import ProtectedRouteElement from "./components/protected-route-element/protected-route-element";
import AnonymousRouteElement from "./components/anonymous-route-element/anonymous-route-element";
import NotFound404 from "./pages/not-found-404/not-found-404";
import EditProfile from "./pages/edit-profile/edit-profile";
import IngredientDetails from "./components/burger-ingredients/ingredient-details/ingredient-details";
import Modal from "./components/modal/modal";
import IngredientDetailsPage from "./pages/ingredient-details/ingredient-details";
import OrdersPage from "./pages/orders/orders";

function App() {
  const { ingredientsRequestStatus } = useAppSelector(
    (state) => state.ingredients
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  switch (ingredientsRequestStatus) {
    case "request":
      return <Loader />;
    case "error":
      return (
        <ErrorView title="Ошибка запроса">
          <p className="text text_type_main-default">
            Не удалось получить список ингридиентов.
          </p>
          <p className="text text_type_main-default">
            Попробуйте перезагрузить страницу.
          </p>
        </ErrorView>
      );

    case "success":
      return (
        <>
          {backgroundLocation && (
            <Routes>
              <Route
                path="/ingredients/:id"
                element={
                  <Modal
                    onClose={() => navigate(-1)}
                    title="Детали ингредиента"
                  >
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          )}

          <AppHeader />
          <main className={`${appStyles.main} pl-5 pr-5`}>
            <Routes location={backgroundLocation || location}>
              <Route index element={<HomePage />} />
              <Route
                path="/ingredients/:id"
                element={<IngredientDetailsPage />}
              />
              <Route
                path="/login"
                element={<AnonymousRouteElement element={<LoginPage />} />}
              />
              <Route
                path="/register"
                element={<AnonymousRouteElement element={<RegisterPage />} />}
              />
              <Route
                path="/forgot-password"
                element={
                  <AnonymousRouteElement element={<ForgotPasswordPage />} />
                }
              />
              <Route
                path="/reset-password"
                element={
                  <AnonymousRouteElement element={<ResetPasswordPage />} />
                }
              />
              <Route
                path="/profile"
                element={<ProtectedRouteElement element={<ProfilePage />} />}
              >
                <Route index element={<EditProfile />} />
                <Route path="orders" element={<OrdersPage />} />
              </Route>
              <Route path="*" element={<NotFound404 />} />
            </Routes>
          </main>
        </>
      );
  }
}

export default App;
