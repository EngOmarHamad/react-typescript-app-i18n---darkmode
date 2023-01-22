import AppContext from './Context/AppContext';
import Home from './Pages/Home';
import i18n from 'i18next';
import LayoutApp from './Layout/Index';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { initReactI18next } from 'react-i18next';
import { useAppContext } from './Context/AppContext';
import { useTranslation } from 'react-i18next';


// import ar_EG from 'antd/locale/ar_EG';
// import dayjs from 'dayjs';
// dayjs.locale('ar_EG');
// ES6 module syntax
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Omar Store": "Omar Store",
        },
      },
      ar: {
        translation: {
          "Omar Store": "متجر عمر",
        },
      },
    },
    lng: "ar", // if you're using a language detector, do not define the lng option
    fallbackLng: "ar",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
function App() {
  document.body.dir = i18n.dir();
  const { t } = useTranslation();
  const { isDark } = useAppContext();

  return (
    <>
      <div className="bg-white dark:bg-black">
        {/* locale={ar_EG} direction="rtl" */}
        <AppContext>
          {/* <ConfigProvider> */}
          <ConfigProvider>
            <Router>
              <Routes>
                <Route path="/" element={<LayoutApp />}>
                  <Route index element={<Home />}></Route>
                </Route>
              </Routes>
            </Router>
          </ConfigProvider>
        </AppContext>
      </div>
    </>
  );
}

export default App;
