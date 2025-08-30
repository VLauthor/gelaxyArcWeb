import AppsBlock from "@/components/pages/general/blocks/AppsBlock";
import HelloBlock from "@/components/pages/general/blocks/HelloBlock";
import IdeaBlock from "@/components/pages/general/blocks/IdeaBlock";
import ProductBlock from "@/components/pages/general/blocks/ProductBlock";
import "./globals.css";
import LazyLoad from "@/components/lazy-load";



export default function Page() {

  return (
    <div className="flex flex-col items-center">

      {/* Преветствующий блок */}
      <LazyLoad>
        <HelloBlock />
      </LazyLoad>

      {/* Дорожка с баннерами */}
      <LazyLoad>
        <IdeaBlock />
      </LazyLoad>

      <LazyLoad>

        <ProductBlock />
      </LazyLoad>

      <LazyLoad>
        <AppsBlock />
      </LazyLoad>
    </div >
  );
}
