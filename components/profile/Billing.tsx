import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

// interface PlanFeature {
//   type: string;
//   features: {
//     name: string;
//     free: boolean;
//     startup: boolean;
//     team: boolean;
//     enterprise: boolean;
//   }[];
// }

// const planFeatures: PlanFeature[] = [
//   {
//     type: "Financial data",
//     features: [
//       {
//         name: "Open/High/Low/Close",
//         free: true,
//         startup: true,
//         team: true,
//         enterprise: true,
//       },
//       {
//         name: "Price-volume difference indicator	",
//         free: true,
//         startup: true,
//         team: true,
//         enterprise: true,
//       },
//     ],
//   },
//   {
//     type: "On-chain data",
//     features: [
//       {
//         name: "Network growth",
//         free: true,
//         startup: false,
//         team: true,
//         enterprise: true,
//       },
//       {
//         name: "Average token age consumed",
//         free: true,
//         startup: false,
//         team: true,
//         enterprise: true,
//       },
//       {
//         name: "Exchange flow",
//         free: false,
//         startup: false,
//         team: true,
//         enterprise: true,
//       },
//       {
//         name: "Total ERC20 exchange funds flow",
//         free: false,
//         startup: false,
//         team: true,
//         enterprise: true,
//       },
//     ],
//   },
//   {
//     type: "Social data",
//     features: [
//       {
//         name: "Dev activity",
//         free: false,
//         startup: true,
//         team: false,
//         enterprise: true,
//       },
//       {
//         name: "Topic search",
//         free: true,
//         startup: true,
//         team: true,
//         enterprise: true,
//       },
//       {
//         name: "Relative social dominance",
//         free: true,
//         startup: true,
//         team: false,
//         enterprise: true,
//       },
//     ],
//   },
// ];

export default function Billing() {
  return (
    <>
      {/* Pricing */}
      <div className="container py-24 lg:py-32">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Pricing
          </h2>
          <p className="mt-1 text-muted-foreground">
            Whatever your status, our offers evolve according to your needs.
          </p>
        </div>
        {/* End Title */}
        {/* Grid */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:items-center">
          {/* Card */}
          <Card className="bg-darkColor">
            <CardHeader className="text-center pb-2">
              <CardTitle className="mb-7">Plan Standard</CardTitle>
              {/* <span className="font-bold text-5xl">690 DH</span> */}
            </CardHeader>
            <CardDescription className="text-center  w-11/12 mx-auto">
              Pour les petites entreprises ou les débutants Idéal pour explorer
              les bases du marketing d’influence.
            </CardDescription>
            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Recherche jusqu’à 3 000 influenceurs
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Recherche avancée avec 5 filtres inclus
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Accès à 5 rapports de créateurs par mois
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Génération de 2 rapports de social listening par mois
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Outils AI pour simplifier vos analyses
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Support régulier 24/7 via chatbot
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Sign up</Button>
            </CardFooter>
          </Card>
          {/* End Card */}
          {/* Card */}
          <Card className="border-mainColor bg-darkColor">
            <CardHeader className="text-center pb-2">
              <Badge className="uppercase w-max self-center mb-3 bg-mainColor text-white">
                Standard
              </Badge>
              <CardTitle className="!mb-7">Plan Most Popular</CardTitle>
              {/* <span className="font-bold text-5xl">1390 DH</span> */}
            </CardHeader>
            <CardDescription className="text-center w-11/12 mx-auto">
              Pour les entreprises en pleine croissance Le plan préféré des
              utilisateurs, combinant volume et fonctionnalités avancées.
            </CardDescription>
            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Recherche jusqu’à 6 000 influenceurs certifiés
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Recherche avancée avec tous les filtres disponibles
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Creator Discovery pour explorer les créateurs les plus
                    pertinents
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Accès à 10 rapports de créateurs par mois
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Génération de 5 rapports de social listening par mois
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Suivi des scores sur toutes les plateformes sociales
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Accès au CRM pour centraliser et organiser vos
                    collaborations
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Support régulier 24/7 via chatbot
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Outils AI avancés pour optimiser vos campagnes
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-mainColor text-white hover:text-mainColor border border-mainColor">
                Sign up
              </Button>
            </CardFooter>
          </Card>
          {/* End Card */}

          {/* Card */}
          <Card className="bg-darkColor">
            <CardHeader className="text-center pb-2">
              <CardTitle className="mb-7">Plan Business</CardTitle>
              {/* <span className="font-bold text-5xl">2990 DH</span> */}
            </CardHeader>
            <CardDescription className="text-center  w-11/12 mx-auto">
              Pour les grandes entreprises et agences Une solution complète pour
              des campagnes à grande échelle.
            </CardDescription>
            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                  Recherche jusqu’à 10 000 influenceurs certifiés
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                  Visualisation illimitée des rapports de créateurs
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Génération illimitée des rapports de social listening
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                  Creator Discovery avec des insights exclusifs

                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                  Recherche avancée avec tous les filtres et options supplémentaires

                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                  Notifications en temps réel pour toutes les mentions de votre marque
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Sign up</Button>
            </CardFooter>
          </Card>
          {/* End Card */}
        </div>
        {/* End Grid */}
        {/* Comparison table */}
        {/* End Comparison table */}
      </div>
      {/* End Pricing */}
    </>
  );
}
