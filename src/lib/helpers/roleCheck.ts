export function hasRole(role: string | undefined, allowedRoles: string[]): boolean {
    if (!role) return false;
    return allowedRoles.includes(role);
}
