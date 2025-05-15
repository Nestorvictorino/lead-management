"use server";

import { revalidatePath } from "next/cache";

// This would be replaced with actual database operations in a real application
const leads: any[] = [];

export async function submitLead(data: any) {
  // In a real application, you would:
  // 1. Upload the resume file to a storage service
  // 2. Save the lead data to a database

  // For this example, we'll just add it to our in-memory array
  leads.push({
    id: Date.now().toString(),
    ...data,
    status: "new",
    createdAt: new Date().toISOString(),
  });

  revalidatePath("/admin");
  return { success: true };
}

export async function getLeads() {
  // In a real application, you would fetch from a database
  // Generate fake leads for demonstration purposes
  leads.push(
    {
      id: 1,
      name: "Ana Rodríguez",
      email: "ana.rodriguez@example.com",
      status: "Reached Out",
      statusCode: 1,
      createdAt: "2025-05-01T10:00:00Z",
    },
    {
      id: 2,
      name: "Carlos Méndez",
      email: "carlos.mendez@example.com",
      status: "pending",
      statusCode: 0,
      createdAt: "2025-05-02T11:15:00Z",
    },
    {
      id: 3,
      name: "Laura Gómez",
      email: "laura.gomez@example.com",
      status: "Reached Out",
      statusCode: 1,
      createdAt: "2025-05-03T09:30:00Z",
    },
    {
      id: 4,
      name: "Miguel Torres",
      email: "miguel.torres@example.com",
      status: "pending",
      statusCode: 0,
      createdAt: "2025-05-04T14:45:00Z",
    },
    {
      id: 5,
      name: "Sofía Herrera",
      email: "sofia.herrera@example.com",
      status: "Reached Out",
      statusCode: 1,
      createdAt: "2025-05-05T08:20:00Z",
    },
    {
      id: 6,
      name: "Andrés Castillo",
      email: "andres.castillo@example.com",
      status: "pending",
      statusCode: 0,
      createdAt: "2025-05-06T12:05:00Z",
    },
    {
      id: 7,
      name: "Valentina Ríos",
      email: "valentina.rios@example.com",
      status: "Reached Out",
      statusCode: 1,
      createdAt: "2025-05-07T10:10:00Z",
    },
    {
      id: 8,
      name: "Javier Morales",
      email: "javier.morales@example.com",
      status: "pending",
      statusCode: 0,
      createdAt: "2025-05-08T16:30:00Z",
    },
    {
      id: 9,
      name: "Camila Vega",
      email: "camila.vega@example.com",
      status: "Reached Out",
      statusCode: 1,
      createdAt: "2025-05-09T09:50:00Z",
    },
    {
      id: 10,
      name: "Diego Navarro",
      email: "diego.navarro@example.com",
      status: "pending",
      statusCode: 0,
      createdAt: "2025-05-10T13:40:00Z",
    }
  );
  return leads;
}

export async function updateLeadStatus(id: string, status: string) {
  // Find and update the lead status
  const leadIndex = leads.findIndex((lead) => lead.id === id);

  if (leadIndex !== -1) {
    leads[leadIndex].status = status;
    leads[leadIndex].updatedAt = new Date().toISOString();
    revalidatePath("/admin");
    return { success: true };
  }

  return { success: false, error: "Lead not found" };
}
