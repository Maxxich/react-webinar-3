import Head from "../../components/head";
import Navigation from "../../components/navigation";
import PageLayout from "../../components/page-layout";
import { i } from "../../internationalization/i";
import { navigationLinks } from "../navigation-links";

export default function NotFoundPage(){
  return (
    <PageLayout
      head={
        <Head title={i('Страница не найдена')}/>
      }

      navigation={<Navigation links={navigationLinks}/>}
    />
  )
}