import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Account from "@/components/profile/Account";
import Billing from "@/components/profile/Billing";
const page = () => {
  return (
    <div className="px-5">
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-4 bg-darkColor">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="invoices-history">Invoices History</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
            <Account />
        </TabsContent>
        <TabsContent value="billing">
            <Billing />
        </TabsContent>
        <TabsContent value="settings">
        settings
        </TabsContent>
        <TabsContent value="invoices-history">

        Invoices History
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
