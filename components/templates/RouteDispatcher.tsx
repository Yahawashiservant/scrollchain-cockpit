"use client";
import UniversalPage from "./UniversalPage";
import FinanceLayout from "./sectors/FinanceLayout";
import SecurityLayout from "./sectors/SecurityLayout";
import CosmicLayout from "./sectors/CosmicLayout";

export default function RouteDispatcher({ title, category, color }: { title: string, category: string, color: string }) {
  // Route based on Category
  if (category.includes("FINANCE") || category.includes("DEFI")) {
    return <FinanceLayout title={title} />;
  }
  if (category.includes("SECURITY") || category.includes("DEFENSE") || category.includes("PROTECTION")) {
    return <SecurityLayout title={title} />;
  }
  if (category.includes("FRONTIER") || category.includes("SPACE") || category.includes("EXOTIC") || category.includes("ABSTRACT")) {
    return <CosmicLayout title={title} />;
  }
  
  // Fallback to standard universal page
  return <UniversalPage title={title} />;
}
