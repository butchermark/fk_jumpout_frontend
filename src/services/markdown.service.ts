import { ApiClient } from "../apiClient/apiClient";
import { config } from "../config";
import { IMarkdown } from "../interfaces/IMarkdown.interface";

const apiClient = ApiClient.getInstance();

export const getMarkdowns = async (): Promise<IMarkdown[]> => {
  const response = await apiClient.get(`${config.markdownUrl}`);
  return response.data;
};

export const createMarkdown = async (
  markdown: IMarkdown
): Promise<IMarkdown> => {
  const response = await apiClient.post(`${config.markdownUrl}`, markdown);
  return response.data;
};

export const updateMarkdown = async (
  markdown: IMarkdown
): Promise<IMarkdown> => {
  const response = await apiClient.put(
    `${config.markdownUrl}/${markdown.id}`,
    markdown
  );
  return response.data;
};

export const deleteMarkdown = async (id: string): Promise<void> => {
  await apiClient.delete(`${config.markdownUrl}/${id}`);
  return;
};

export const getMarkdown = async (id: string): Promise<IMarkdown> => {
  const response = await apiClient.get(`${config.markdownUrl}/${id}`);
  return response.data;
};
