public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [
            SELECT Name, Email, Phone, Title
            FROM Contact
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
    }
}