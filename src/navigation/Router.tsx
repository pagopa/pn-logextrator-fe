import { Routes, Route, Navigate } from "react-router-dom";
import TenderPage from "../pages/tender/TenderPage";
import {TenderDetailPage} from "../pages/tender/TenderDetailPage";
import {FormTenderPage} from "../pages/createTender/FormTenderPage";
import {CREATE_TENDER_ROUTE, TENDERS_TABLE_ROUTE, TENDER_DETAIL_ROUTE} from "./router.const";
import MonitorPage from "../pages/monitor/MonitorPage";
import LoginPage from "../pages/login/LoginPage";
import SearchPage from "../pages/search/SearchPage";
import PrivateRoute from "./PrivateRoute";
import AggregatesPage from "../pages/aggregates/AggregatesPage";
import AggregateDetailPage from "../pages/aggregates/AggregateDetailPage";
import AssociationPage from "../pages/paAssociation/PaAssociationPage";
import PaTransferListPage from "../pages/paTransfer/PaTransferListPage";
import * as routes from "./routes";
import { Permission } from "../model/user-permission";
/**
 * Create the routing of the page
 */
function Router() {
  return (
    <Routes>
      <Route key={"default"} path={"/"} element={<LoginPage />} />
      <Route path="*" element={<Navigate replace to="/search" />} />
      <Route
        key={"default"}
        path={"/"}
        element={<LoginPage />}
      />

      <Route
        path="/search"
        element={
          <PrivateRoute roles={[Permission.API_KEY_READ]}>
            <SearchPage />
          </PrivateRoute>
        }

      />
      <Route
        path={TENDERS_TABLE_ROUTE}
        element={
          <PrivateRoute roles={[Permission.API_KEY_READ]}>
            <TenderPage />
          </PrivateRoute>
        }
      />
      <Route path={CREATE_TENDER_ROUTE}>
        <Route path=":tenderCode" element={
          <PrivateRoute roles={[Permission.API_KEY_READ]}>
            <FormTenderPage />
          </PrivateRoute>}
        />

        <Route path="" element={
          <PrivateRoute roles={[Permission.API_KEY_READ]}>
            <FormTenderPage />
          </PrivateRoute>}
        />
      </Route>

      <Route
        path={CREATE_TENDER_ROUTE}
        element={
          <PrivateRoute roles={[Permission.API_KEY_READ]}>
            <FormTenderPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/monitoring"
        element={
          <PrivateRoute roles={[Permission.API_KEY_READ]}>
            <MonitorPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.AGGREGATES}
        element={
          <PrivateRoute roles={[Permission.API_KEY_READ]}>
            <AggregatesPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.UPDATE_AGGREGATE}
        element={
          <PrivateRoute roles={[Permission.API_KEY_READ]}>
            <AggregateDetailPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.AGGREGATE}
        element={
          <PrivateRoute roles={[Permission.API_KEY_READ]}>
            <AggregateDetailPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.ADD_PA}
        element={
          <PrivateRoute roles={[Permission.API_KEY_READ]}>
            <AssociationPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.TRANSFER_PA}
        element={
          <PrivateRoute roles={[Permission.API_KEY_READ]}>
            <PaTransferListPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate replace to="/search" />} />

        <Route
            path={TENDER_DETAIL_ROUTE}
            element={
                <PrivateRoute roles={[Permission.API_KEY_READ]}>
                    <TenderDetailPage />
                </PrivateRoute>
            }
        />


    </Routes>
  );
}

export default Router;
